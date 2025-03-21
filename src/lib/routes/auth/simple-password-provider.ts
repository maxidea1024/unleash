import type { Response } from 'express';
import type { OpenApiService } from '../../services/openapi-service';
import type { Logger } from '../../logger';
import type { IGanpaConfig } from '../../server-impl';
import type UserService from '../../services/user-service';
import type { IGanpaServices } from '../../types';
import { NONE } from '../../types/permissions';
import Controller from '../controller';
import type { IAuthRequest } from '../ganpa-types';
import { createRequestSchema } from '../../openapi/util/create-request-schema';
import { createResponseSchema } from '../../openapi/util/create-response-schema';
import { userSchema, type UserSchema } from '../../openapi/spec/user-schema';
import type { LoginSchema } from '../../openapi/spec/login-schema';
import { serializeDates } from '../../types/serialize-dates';
import { getStandardResponses } from '../../openapi';

export class SimplePasswordProvider extends Controller {
  private readonly logger: Logger;
  private readonly openApiService: OpenApiService;
  private readonly userService: UserService;

  constructor(
    config: IGanpaConfig,
    {
      userService,
      openApiService,
    }: Pick<IGanpaServices, 'userService' | 'openApiService'>,
  ) {
    super(config);

    this.logger = config.getLogger('simple-password-provider.ts');

    this.openApiService = openApiService;
    this.userService = userService;

    this.route({
      method: 'post',
      path: '/login',
      handler: this.login,
      permission: NONE,
      middleware: [
        openApiService.validPath({
          tags: ['Auth'],
          summary: 'Log in',
          description: 'Logs in the user and creates an active session',
          operationId: 'login',
          requestBody: createRequestSchema('loginSchema'),
          responses: {
            200: createResponseSchema('userSchema'),
            ...getStandardResponses(401),
          },
        }),
      ],
    });
  }

  async login(
    req: IAuthRequest<void, void, LoginSchema>,
    res: Response<UserSchema>,
  ): Promise<void> {
    const { username, password } = req.body;

    const user = await this.userService.loginUser(username, password);
    req.session.user = user;

    this.openApiService.respondWithValidation(
      200,
      res,
      userSchema.$id,
      serializeDates(user),
    );
  }
}
