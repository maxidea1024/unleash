import type { Response } from 'express';
import type { AuthedRequest } from '../../types/core';
import type { IGanpaServices } from '../../types/services';
import { AuthType, type IGanpaConfig } from '../../types/options';
import version from '../../util/version';
import Controller from '../controller';
import type VersionService from '../../services/version-service';
import type SettingService from '../../services/setting-service';
import {
  type ISimpleAuthSettings,
  simpleAuthSettingsKey,
} from '../../types/settings/simple-auth-settings';
import { ADMIN, NONE } from '../../types/permissions';
import { createResponseSchema } from '../../openapi/util/create-response-schema';
import {
  uiConfigSchema,
  type UiConfigSchema,
} from '../../openapi/spec/ui-config-schema';
import type { OpenApiService } from '../../services/openapi-service';
import type { EmailService } from '../../services/email-service';
import { emptyResponse } from '../../openapi/util/standard-responses';
import type { IAuthRequest } from '../ganpa-types';
import NotFoundError from '../../error/notfound-error';
import type { SetUiConfigSchema } from '../../openapi/spec/set-ui-config-schema';
import { createRequestSchema } from '../../openapi/util/create-request-schema';
import type { FrontendApiService } from '../../services';
import type MaintenanceService from '../../features/maintenance/maintenance-service';
import type ClientInstanceService from '../../features/metrics/instance/instance-service';

export default class ConfigController extends Controller {
  private readonly versionService: VersionService;
  private readonly settingService: SettingService;
  private readonly frontendApiService: FrontendApiService;
  private readonly emailService: EmailService;
  private readonly clientInstanceService: ClientInstanceService;
  private readonly maintenanceService: MaintenanceService;
  private readonly openApiService: OpenApiService;

  constructor(
    config: IGanpaConfig,
    {
      versionService,
      settingService,
      emailService,
      openApiService,
      frontendApiService,
      maintenanceService,
      clientInstanceService,
    }: Pick<
      IGanpaServices,
      | 'versionService'
      | 'settingService'
      | 'emailService'
      | 'openApiService'
      | 'frontendApiService'
      | 'maintenanceService'
      | 'clientInstanceService'
    >,
  ) {
    super(config);

    this.versionService = versionService;
    this.settingService = settingService;
    this.emailService = emailService;
    this.openApiService = openApiService;
    this.frontendApiService = frontendApiService;
    this.maintenanceService = maintenanceService;
    this.clientInstanceService = clientInstanceService;

    this.route({
      method: 'get',
      path: '',
      handler: this.getUiConfig,
      permission: NONE,
      middleware: [
        openApiService.validPath({
          tags: ['Admin UI'],
          summary: 'Get UI configuration',
          description:
            'Retrieves the full configuration used to set up the Ganpa Admin UI.',
          operationId: 'getUiConfig',
          responses: {
            200: createResponseSchema('uiConfigSchema'),
          },
        }),
      ],
    });

    this.route({
      method: 'post',
      path: '',
      handler: this.setUiConfig,
      permission: ADMIN,
      middleware: [
        openApiService.validPath({
          tags: ['Admin UI'],
          summary: 'Set UI configuration',
          description: 'Sets the UI configuration for this Ganpa instance.',
          operationId: 'setUiConfig',
          requestBody: createRequestSchema('setUiConfigSchema'),
          responses: { 200: emptyResponse },
        }),
      ],
    });
  }

  async getUiConfig(
    req: AuthedRequest,
    res: Response<UiConfigSchema>,
  ): Promise<void> {
    const [frontendSettings, simpleAuthSettings, maintenanceMode] =
      await Promise.all([
        this.frontendApiService.getFrontendSettings(false),
        this.settingService.get<ISimpleAuthSettings>(simpleAuthSettingsKey),
        this.maintenanceService.isMaintenanceMode(),
      ]);

    const disablePasswordAuth =
      simpleAuthSettings?.disabled ||
      this.config.authentication.type === AuthType.NONE;

    const expFlags = this.config.flagResolver.getAll({
      email: req.user.email,
    });

    const flags = {
      ...this.config.ui.flags,
      ...expFlags,
    };

    const response: UiConfigSchema = {
      ...this.config.ui,
      flags,
      version,
      emailEnabled: this.emailService.isEnabled(),
      unleashUrl: this.config.server.unleashUrl,
      baseUriPath: this.config.server.baseUriPath,
      authenticationType: this.config.authentication?.type,
      segmentValuesLimit: this.config.resourceLimits.segmentValues,
      strategySegmentsLimit: this.config.resourceLimits.strategySegments,
      frontendApiOrigins: frontendSettings.frontendApiOrigins,
      versionInfo: await this.versionService.getVersionInfo(),
      networkViewEnabled: this.config.prometheusApi !== undefined,
      resourceLimits: this.config.resourceLimits,
      disablePasswordAuth,
      maintenanceMode,
      feedbackUriPath: this.config.feedbackUriPath,
      unleashAIAvailable: this.config.openAIAPIKey !== undefined,
    };

    // console.log('ui-config:', response);

    this.openApiService.respondWithValidation(
      200,
      res,
      uiConfigSchema.$id,
      response,
    );
  }

  async setUiConfig(
    req: IAuthRequest<void, void, SetUiConfigSchema>,
    res: Response<string>,
  ): Promise<void> {
    if (req.body.frontendSettings) {
      await this.frontendApiService.setFrontendSettings(
        req.body.frontendSettings,
        req.audit,
      );
      res.sendStatus(204);
      return;
    }

    throw new NotFoundError();
  }
}
