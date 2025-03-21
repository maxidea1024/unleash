import type { Logger } from '../../logger';
import type {
  IEventStore,
  IFlagResolver,
  IGanpaConfig,
  IGanpaStores,
} from '../../types';
import EventEmitter from 'events';

export const UPDATE_REVISION = 'UPDATE_REVISION';

export default class ConfigurationRevisionService extends EventEmitter {
  private static instance: ConfigurationRevisionService;

  private readonly logger: Logger;
  private readonly eventStore: IEventStore;
  private revisionId: number;
  private readonly flagResolver: IFlagResolver;

  private constructor(
    { eventStore }: Pick<IGanpaStores, 'eventStore'>,
    {
      getLogger,
      flagResolver,
    }: Pick<IGanpaConfig, 'getLogger' | 'flagResolver'>,
  ) {
    super();

    this.logger = getLogger('configuration-revision-service.ts');

    this.eventStore = eventStore;
    this.flagResolver = flagResolver;
    this.revisionId = 0;
  }

  static getInstance(
    { eventStore }: Pick<IGanpaStores, 'eventStore'>,
    {
      getLogger,
      flagResolver,
    }: Pick<IGanpaConfig, 'getLogger' | 'flagResolver'>,
  ) {
    if (!ConfigurationRevisionService.instance) {
      ConfigurationRevisionService.instance = new ConfigurationRevisionService(
        { eventStore },
        { getLogger, flagResolver },
      );
    }

    return ConfigurationRevisionService.instance;
  }

  async getMaxRevisionId(): Promise<number> {
    if (this.revisionId > 0) {
      return this.revisionId;
    } else {
      return this.updateMaxRevisionId();
    }
  }

  async updateMaxRevisionId(): Promise<number> {
    if (this.flagResolver.isEnabled('disableUpdateMaxRevisionId')) {
      return 0;
    }

    const revisionId = await this.eventStore.getMaxRevisionId(this.revisionId);
    if (this.revisionId !== revisionId) {
      this.logger.debug(
        'Updating feature configuration with new revision Id',
        revisionId,
      );
      this.emit(UPDATE_REVISION, revisionId);
      this.revisionId = revisionId;
    }

    return this.revisionId;
  }

  destroy(): void {
    ConfigurationRevisionService.instance?.removeAllListeners();
  }
}
