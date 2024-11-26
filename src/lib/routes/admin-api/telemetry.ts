import type { Response } from 'express';
import type { OpenApiService } from '../../services';
import type { IAuthRequest } from '../unleash-types';
import type { IUnleashConfig } from '../../types/options';
import Controller from '../controller';
import { NONE } from '../../types/permissions';
import type { IUnleashServices } from '../../types';
import { createResponseSchema } from '../../openapi/util/create-response-schema';
import {
  telemetrySettingsSchema,
  type TelemetrySettingsSchema,
} from '../../openapi/spec/telemetry-settings-schema';

export default class TelemetryController extends Controller {
  readonly config: IUnleashConfig;
  private readonly openApiService: OpenApiService;

  constructor(
    config: IUnleashConfig,
    { openApiService }: Pick<IUnleashServices, 'openApiService'>,
  ) {
    super(config);

    this.config = config;
    this.openApiService = openApiService;

    this.route({
      method: 'get',
      path: '/settings',
      handler: this.getTelemetrySettings,
      permission: NONE,
      middleware: [
        openApiService.validPath({
          tags: ['Telemetry'],
          summary: 'Get telemetry settings',
          description:
            'Provides the configured settings for [telemetry information collection](https://docs.getunleash.io/topics/data-collection)',
          operationId: 'getTelemetrySettings',
          responses: {
            200: createResponseSchema('telemetrySettingsSchema'),
          },
        }),
      ],
    });
  }

  async getTelemetrySettings(
    _req: IAuthRequest,
    res: Response<TelemetrySettingsSchema>,
  ): Promise<void> {
    this.openApiService.respondWithValidation(
      200,
      res,
      telemetrySettingsSchema.$id,
      {
        versionInfoCollectionEnabled: this.config.versionCheck.enable,
        featureInfoCollectionEnabled: this.config.telemetry,
      },
    );
  }
}
