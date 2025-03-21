import type { Request, Response } from 'express';
import Controller from '../../controller';
import type { IGanpaServices } from '../../../types/services';
import type { IGanpaConfig } from '../../../types/options';
import type ProjectHealthService from '../../../services/project-health-service';
import type { Logger } from '../../../logger';
import type { IProjectParam } from '../../../types/model';
import { NONE } from '../../../types/permissions';
import type { OpenApiService } from '../../../services/openapi-service';
import { createResponseSchema } from '../../../openapi/util/create-response-schema';
import { getStandardResponses } from '../../../openapi/util/standard-responses';
import { serializeDates } from '../../../types/serialize-dates';
import {
  healthReportSchema,
  type HealthReportSchema,
} from '../../../openapi/spec/health-report-schema';

export default class ProjectHealthReport extends Controller {
  private readonly projectHealthService: ProjectHealthService;
  private readonly openApiService: OpenApiService;
  private readonly logger: Logger;

  constructor(
    config: IGanpaConfig,
    {
      projectHealthService,
      openApiService,
    }: Pick<IGanpaServices, 'projectHealthService' | 'openApiService'>,
  ) {
    super(config);

    this.logger = config.getLogger('health-report.ts');

    this.projectHealthService = projectHealthService;
    this.openApiService = openApiService;

    this.route({
      method: 'get',
      path: '/:projectId/health-report',
      handler: this.getProjectHealthReport,
      permission: NONE,
      middleware: [
        openApiService.validPath({
          tags: ['Projects'],
          operationId: 'getProjectHealthReport',
          summary: 'Get a health report for a project.',
          description:
            'This endpoint returns a health report for the specified project. This data is used for [the technical debt dashboard](https://docs.getunleash.io/reference/technical-debt#the-technical-debt-dashboard)',
          responses: {
            200: createResponseSchema('healthReportSchema'),
            ...getStandardResponses(401, 403, 404),
          },
        }),
      ],
    });
  }

  async getProjectHealthReport(
    req: Request<IProjectParam>,
    res: Response<HealthReportSchema>,
  ): Promise<void> {
    const { projectId } = req.params;
    const overview =
      await this.projectHealthService.getProjectHealthReport(projectId);
    this.openApiService.respondWithValidation(
      200,
      res,
      healthReportSchema.$id,
      serializeDates(overview),
    );
  }
}
