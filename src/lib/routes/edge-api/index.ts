import type { Response } from 'express';
import Controller from '../controller';
import type { IUnleashConfig, IUnleashServices } from '../../types';
import type { Logger } from '../../logger';
import { NONE } from '../../types/permissions';
import { createResponseSchema } from '../../openapi/util/create-response-schema';
import type { RequestBody } from '../unleash-types';
import { createRequestSchema } from '../../openapi/util/create-request-schema';
import {
  validatedEdgeTokensSchema,
  type ValidatedEdgeTokensSchema,
} from '../../openapi/spec/validated-edge-tokens-schema';
import type EdgeService from '../../services/edge-service';
import type { OpenApiService } from '../../services/openapi-service';
import { getStandardResponses } from '../../openapi/util/standard-responses';
import type { TokenStringListSchema } from '../../openapi';

export default class EdgeController extends Controller {
  private readonly edgeService: EdgeService;
  private readonly openApiService: OpenApiService;
  private readonly logger: Logger;

  constructor(
    config: IUnleashConfig,
    {
      edgeService,
      openApiService,
    }: Pick<IUnleashServices, 'edgeService' | 'openApiService'>,
  ) {
    super(config);

    this.logger = config.getLogger('edge-controller.ts');

    this.edgeService = edgeService;
    this.openApiService = openApiService;

    this.route({
      method: 'post',
      path: '/validate',
      handler: this.getValidTokens,
      permission: NONE,
      middleware: [
        this.openApiService.validPath({
          tags: ['Edge'],
          security: [{}],
          summary: 'Check which tokens are valid',
          description:
            'This operation accepts a list of tokens to validate. Ganpa will validate each token you provide. For each valid token you provide, Ganpa will return the token along with its type and which projects it has access to.',
          operationId: 'getValidTokens',
          requestBody: createRequestSchema('tokenStringListSchema'),
          responses: {
            200: createResponseSchema('validatedEdgeTokensSchema'),
            ...getStandardResponses(400, 413, 415),
          },
        }),
      ],
    });
  }

  async getValidTokens(
    req: RequestBody<TokenStringListSchema>,
    res: Response<ValidatedEdgeTokensSchema>,
  ): Promise<void> {
    const tokens = await this.edgeService.getValidTokens(req.body.tokens);
    this.openApiService.respondWithValidation<ValidatedEdgeTokensSchema>(
      200,
      res,
      validatedEdgeTokensSchema.$id,
      tokens,
    );
  }
}
