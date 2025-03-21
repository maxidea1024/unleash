import type {
  IFeatureToggleClientStore,
  IFeatureToggleQuery,
  ISegmentReadModel,
  IGanpaConfig,
  IGanpaStores,
} from '../../types';

import type { Logger } from '../../logger';

import type { FeatureConfigurationClient } from '../feature-toggle/types/feature-toggle-strategies-store-type';

export class ClientFeatureToggleService {
  private readonly logger: Logger;
  private readonly clientFeatureToggleStore: IFeatureToggleClientStore;
  private readonly segmentReadModel: ISegmentReadModel;

  constructor(
    {
      clientFeatureToggleStore,
    }: Pick<IGanpaStores, 'clientFeatureToggleStore'>,
    segmentReadModel: ISegmentReadModel,
    { getLogger }: Pick<IGanpaConfig, 'getLogger' | 'flagResolver'>,
  ) {
    this.logger = getLogger('client-feature-toggle-service.ts');

    this.segmentReadModel = segmentReadModel;
    this.clientFeatureToggleStore = clientFeatureToggleStore;
  }

  async getActiveSegmentsForClient() {
    return this.segmentReadModel.getActiveForClient();
  }

  async getClientFeatures(
    query?: IFeatureToggleQuery,
  ): Promise<FeatureConfigurationClient[]> {
    const result = await this.clientFeatureToggleStore.getClient(query || {});

    return result.map(
      ({
        name,
        type,
        enabled,
        project,
        stale,
        strategies,
        variants,
        description,
        impressionData,
        dependencies,
      }) => ({
        name,
        type,
        enabled,
        project,
        stale,
        strategies,
        variants,
        description,
        impressionData,
        dependencies,
      }),
    );
  }
}
