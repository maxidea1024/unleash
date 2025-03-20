import type { IGanpaConfig, IGanpaStores } from '../../types';
import type { IPrivateProjectStore } from './privateProjectStoreType';
import type { IPrivateProjectChecker } from './privateProjectCheckerType';
import { ALL_PROJECT_ACCESS, type ProjectAccess } from './privateProjectStore';

export class PrivateProjectChecker implements IPrivateProjectChecker {
  private readonly privateProjectStore: IPrivateProjectStore;
  private readonly isEnterprise: boolean;

  constructor(
    { privateProjectStore }: Pick<IGanpaStores, 'privateProjectStore'>,
    { isEnterprise }: Pick<IGanpaConfig, 'isEnterprise'>,
  ) {
    this.privateProjectStore = privateProjectStore;
    this.isEnterprise = isEnterprise;
  }

  async getUserAccessibleProjects(userId: number): Promise<ProjectAccess> {
    return this.isEnterprise
      ? this.privateProjectStore.getUserAccessibleProjects(userId)
      : Promise.resolve(ALL_PROJECT_ACCESS);
  }

  async filterUserAccessibleProjects(
    userId: number,
    projects: string[],
  ): Promise<string[]> {
    if (!this.isEnterprise) {
      return projects;
    }
    const accessibleProjects =
      await this.privateProjectStore.getUserAccessibleProjects(userId);
    if (accessibleProjects.mode === 'all') {
      return projects;
    }
    return projects.filter((project) =>
      accessibleProjects.projects.includes(project),
    );
  }

  async hasAccessToProject(
    userId: number,
    projectId: string,
  ): Promise<boolean> {
    const projectAccess = await this.getUserAccessibleProjects(userId);
    return (
      projectAccess.mode === 'all' || projectAccess.projects.includes(projectId)
    );
  }
}
