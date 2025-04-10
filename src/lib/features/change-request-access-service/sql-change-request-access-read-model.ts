import { SKIP_CHANGE_REQUEST } from '../../types';
import type { Db } from '../../db/db';
import type { AccessService } from '../../services';
import type User from '../../types/user';
import type { IChangeRequestAccessReadModel } from './change-request-access-read-model';

export class ChangeRequestAccessReadModel
  implements IChangeRequestAccessReadModel
{
  private readonly db: Db;
  private readonly accessService: AccessService;

  constructor(db: Db, accessService: AccessService) {
    this.db = db;
    this.accessService = accessService;
  }

  async canBypassChangeRequest(
    project: string,
    environment: string,
    user?: User,
  ): Promise<boolean> {
    const [canSkipChangeRequest, changeRequestEnabled] = await Promise.all([
      user
        ? this.accessService.hasPermission(
            user,
            SKIP_CHANGE_REQUEST,
            project,
            environment,
          )
        : Promise.resolve(false),
      this.isChangeRequestsEnabled(project, environment),
    ]);

    return canSkipChangeRequest || !changeRequestEnabled;
  }

  async canBypassChangeRequestForProject(
    project: string,
    user?: User,
  ): Promise<boolean> {
    const [canSkipChangeRequest, changeRequestEnabled] = await Promise.all([
      user
        ? this.accessService.hasPermission(user, SKIP_CHANGE_REQUEST, project)
        : Promise.resolve(false),
      this.isChangeRequestsEnabledForProject(project),
    ]);

    return canSkipChangeRequest || !changeRequestEnabled;
  }

  async isChangeRequestsEnabled(
    project: string,
    environment: string,
  ): Promise<boolean> {
    const result = await this.db.raw(
      `SELECT EXISTS(SELECT 1 FROM change_request_settings WHERE environment = ? and project = ?) AS present`,
      [environment, project],
    );
    const { present } = result.rows[0];
    return present;
  }

  async isChangeRequestsEnabledForProject(project: string): Promise<boolean> {
    const result = await this.db('change_request_settings')
      .join('project_environments', function () {
        return this.on(
          'change_request_settings.project',
          'project_environments.project_id',
        ).andOn(
          'change_request_settings.environment',
          'project_environments.environment_name',
        );
      })
      .where('change_request_settings.project', project)
      .select('change_request_settings.project')
      .first();

    return Boolean(result);
  }
}
