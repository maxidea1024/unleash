import type { IGanpaStores } from '../types/stores';
import type { IGanpaConfig } from '../types/options';
import type { Logger } from '../logger';
import type {
  IFeatureType,
  IFeatureTypeStore,
} from '../types/stores/feature-type-store';
import NotFoundError from '../error/notfound-error';
import type EventService from '../features/events/event-service';
import { FeatureTypeUpdatedEvent, type IAuditUser } from '../types';

export default class FeatureTypeService {
  private readonly featureTypeStore: IFeatureTypeStore;
  private readonly eventService: EventService;
  private readonly logger: Logger;

  constructor(
    { featureTypeStore }: Pick<IGanpaStores, 'featureTypeStore'>,
    { getLogger }: Pick<IGanpaConfig, 'getLogger'>,
    eventService: EventService,
  ) {
    this.logger = getLogger('feature-type-service.ts');

    this.featureTypeStore = featureTypeStore;
    this.eventService = eventService;
  }

  async getAll(): Promise<IFeatureType[]> {
    return this.featureTypeStore.getAll();
  }

  async updateLifetime(
    id: string,
    newLifetimeDays: number | null,
    auditUser: IAuditUser,
  ): Promise<IFeatureType> {
    // because our OpenAPI library does type coercion, any `null` values you
    // pass in get converted to `0`.
    const translatedLifetime = newLifetimeDays === 0 ? null : newLifetimeDays;

    const featureType = await this.featureTypeStore.get(id);

    const result = await this.featureTypeStore.updateLifetime(
      id,
      translatedLifetime,
    );

    if (!featureType || !result) {
      throw new NotFoundError(
        `The feature type you tried to update ("${id}") does not exist.`,
      );
    }

    await this.eventService.storeEvent(
      new FeatureTypeUpdatedEvent({
        auditUser,
        data: { ...featureType, lifetimeDays: translatedLifetime },
        preData: featureType,
      }),
    );

    return result;
  }
}
