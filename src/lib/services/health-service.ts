import type { IGanpaStores } from '../types/stores';
import type { IGanpaConfig } from '../types/options';
import type { Logger } from '../logger';
import type { IFeatureTypeStore } from '../types/stores/feature-type-store';

export default class HealthService {
  private readonly featureTypeStore: IFeatureTypeStore;
  private readonly logger: Logger;

  constructor(
    { featureTypeStore }: Pick<IGanpaStores, 'featureTypeStore'>,
    { getLogger }: Pick<IGanpaConfig, 'getLogger'>,
  ) {
    this.logger = getLogger('health-service.ts');

    this.featureTypeStore = featureTypeStore;
  }

  // CHECKME: 현재 사용되고 있지 않는것 같다.
  // async dbIsUp(): Promise<boolean> {
  //   // TODO: 이렇게 해야하나?
  //   const row = await this.featureTypeStore.getAll();
  //   return row.length > 0;
  // }
}
