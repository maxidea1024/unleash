import type {
  FeatureToggle,
  IFeatureToggleClient,
  IFeatureToggleQuery,
} from '../../../types/model';
import type { IFeatureToggleClientStore } from '../types/client-feature-toggle-store-type';
import type { IGetAdminFeatures } from '../client-feature-toggle-store';

export default class FakeClientFeatureToggleStore
  implements IFeatureToggleClientStore
{
  featureToggles: FeatureToggle[] = [];

  async getFeatures(
    featureQuery?: IFeatureToggleQuery,
    archived: boolean = false,
  ): Promise<IFeatureToggleClient[]> {
    const rows = this.featureToggles.filter((toggle) => {
      // TODO: featureQuery가 지정되지 않았을 경우에 대한 처리가 아래의 상황에서 안전한가?
      if (featureQuery.namePrefix) {
        if (featureQuery.project) {
          return (
            toggle.name.startsWith(featureQuery.namePrefix) &&
            featureQuery.project.some((project) =>
              project.includes(toggle.project),
            )
          );
        }
        return toggle.name.startsWith(featureQuery.namePrefix);
      }
      if (featureQuery.project) {
        return featureQuery.project.some((project) =>
          project.includes(toggle.project),
        );
      }
      return toggle.archived === archived;
    });

    const clientRows: IFeatureToggleClient[] = rows.map((t) => ({
      ...t,
      enabled: true,
      strategies: [],
      description: t.description || '',
      type: t.type || 'Release',
      stale: t.stale || false,
      variants: [],
      tags: [],
    }));
    return Promise.resolve(clientRows);
  }

  async getClient(
    query?: IFeatureToggleQuery,
  ): Promise<IFeatureToggleClient[]> {
    return this.getFeatures(query);
  }

  async getFrontendApiClient(
    query?: IFeatureToggleQuery,
  ): Promise<IFeatureToggleClient[]> {
    return this.getFeatures(query);
  }

  async getPlayground(
    query?: IFeatureToggleQuery,
  ): Promise<IFeatureToggleClient[]> {
    const features = await this.getFeatures(query);
    return features.map(({ strategies, ...rest }) => ({
      ...rest,
      strategies: strategies.map((strategy, index) => ({
        ...strategy,
        id: `strategy#${index}`,
      })),
    }));
  }

  async getAdmin({
    featureQuery: query,
    archived,
  }: IGetAdminFeatures): Promise<IFeatureToggleClient[]> {
    return this.getFeatures(query, archived);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async createFeature(feature: any): Promise<void> {
    this.featureToggles.push({
      project: feature.project || 'default',
      createdAt: new Date(),
      archived: false,
      ...feature,
    });

    return Promise.resolve();
  }
}
