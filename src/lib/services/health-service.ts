import type { IUnleashStores } from '../types/stores';
import type { IUnleashConfig } from '../types/option';
import type { Logger } from '../logger';
import type { IFeatureTypeStore } from '../types/stores/feature-type-store';

export default class HealthService {
  private readonly featureTypeStore: IFeatureTypeStore;
  private readonly logger: Logger;

  constructor(
    { featureTypeStore }: Pick<IUnleashStores, 'featureTypeStore'>,
    { getLogger }: Pick<IUnleashConfig, 'getLogger'>,
  ) {
    this.featureTypeStore = featureTypeStore;
    this.logger = getLogger('services/health-service.ts');
  }

  async dbIsUp(): Promise<boolean> {
    // TODO: 이렇게 해야하나?
    const row = await this.featureTypeStore.getAll();
    return row.length > 0;
  }
}
