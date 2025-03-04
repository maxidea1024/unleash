import type { IUnleashConfig } from '../types/options';
import type { IUnleashStores } from '../types/stores';
import type { Logger } from '../logger';
import type { IEventStore } from '../types/stores/event-store';
import type { IFlagResolver } from '../types';

export default class EventAnnouncer {
  private readonly eventStore: IEventStore;
  private readonly flagResolver: IFlagResolver;
  private readonly logger: Logger;

  constructor(
    { eventStore }: Pick<IUnleashStores, 'eventStore'>,
    {
      getLogger,
      flagResolver,
    }: Pick<IUnleashConfig, 'getLogger' | 'flagResolver'>,
  ) {
    this.logger = getLogger('event-announcer-service.ts');

    this.flagResolver = flagResolver;
    this.eventStore = eventStore;
  }

  async publishUnannouncedEvents(): Promise<void> {
    if (this.flagResolver.isEnabled('disablePublishUnannouncedEvents')) {
      return Promise.resolve();
    }

    return this.eventStore.publishUnannouncedEvents();
  }
}
