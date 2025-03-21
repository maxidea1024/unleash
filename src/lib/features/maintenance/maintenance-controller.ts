import { ADMIN, type IGanpaConfig, type IGanpaServices } from '../../types';
import type { Request, Response } from 'express';
import Controller from '../../routes/controller';
import type { Logger } from '../../logger';
import {
  createRequestSchema,
  createResponseSchema,
  emptyResponse,
  getStandardResponses,
} from '../../openapi';
import type { OpenApiService } from '../../services';
import type { IAuthRequest } from '../../routes/ganpa-types';
import {
  type MaintenanceSchema,
  maintenanceSchema,
} from '../../openapi/spec/maintenance-schema';
import type MaintenanceService from '../../features/maintenance/maintenance-service';
import type { ToggleMaintenanceSchema } from '../../openapi/spec/toggle-maintenance-schema';

export default class MaintenanceController extends Controller {
  private readonly maintenanceService: MaintenanceService;
  private readonly openApiService: OpenApiService;
  private readonly logger: Logger;

  constructor(
    config: IGanpaConfig,
    {
      maintenanceService,
      openApiService,
    }: Pick<IGanpaServices, 'maintenanceService' | 'openApiService'>,
  ) {
    super(config);

    this.logger = config.getLogger('maintenance-controller.ts');

    this.maintenanceService = maintenanceService;
    this.openApiService = openApiService;

    this.route({
      method: 'post',
      path: '',
      permission: ADMIN,
      handler: this.toggleMaintenance,
      middleware: [
        this.openApiService.validPath({
          summary: 'Enabled/disabled maintenance mode',
          description:
            'Lets administrators put Unleash into a mostly read-only mode. While Unleash is in maintenance mode, users can not change any configuration settings',
          tags: ['Maintenance'],
          operationId: 'toggleMaintenance',
          responses: {
            204: emptyResponse,
            ...getStandardResponses(400, 401, 403),
          },
          requestBody: createRequestSchema('toggleMaintenanceSchema'),
        }),
      ],
    });

    this.route({
      method: 'get',
      path: '',
      permission: ADMIN,
      handler: this.getMaintenance,
      middleware: [
        this.openApiService.validPath({
          summary: 'Get maintenance mode status',
          description:
            'Tells you whether maintenance mode is enabled or disabled',
          tags: ['Maintenance'],
          operationId: 'getMaintenance',
          responses: {
            200: createResponseSchema('maintenanceSchema'),
            ...getStandardResponses(401, 403),
          },
        }),
      ],
    });
  }

  async toggleMaintenance(
    req: IAuthRequest<unknown, unknown, ToggleMaintenanceSchema>,
    res: Response<MaintenanceSchema>,
  ): Promise<void> {
    await this.maintenanceService.toggleMaintenanceMode(req.body, req.audit);
    res.status(204).end();
  }

  async getMaintenance(req: Request, res: Response): Promise<void> {
    const settings = await this.maintenanceService.getMaintenanceSetting();
    this.openApiService.respondWithValidation(
      200,
      res,
      maintenanceSchema.$id,
      settings,
    );
  }
}
