import fetch from 'make-fetch-happen';
import { addonDefinitionSchema } from './addon-schema';
import type { Logger } from '../logger';
import type { IAddonConfig, IAddonDefinition } from '../types/model';
import type { IEvent } from '../types/events';
import type { IntegrationEventsService } from '../features/integration-events/integration-events-service';
import type { IntegrationEventWriteModel } from '../features/integration-events/integration-events-store';
import type EventEmitter from 'events';
import type { IFlagResolver } from '../types';
import { ADDON_EVENTS_HANDLED } from '../metric-events';

export default abstract class Addon {
  protected readonly logger: Logger;
  protected readonly _name: string;
  protected readonly _definition: IAddonDefinition;
  protected readonly integrationEventsService: IntegrationEventsService;
  protected readonly eventBus: EventEmitter;
  protected readonly flagResolver: IFlagResolver;

  constructor(
    definition: IAddonDefinition,
    {
      getLogger,
      integrationEventsService,
      flagResolver,
      eventBus,
    }: IAddonConfig,
  ) {
    this.logger = getLogger(`addon/${definition.name}`);

    const { error } = addonDefinitionSchema.validate(definition);
    if (error) {
      this.logger.warn(
        `Could not load addon provider ${definition.name}`,
        error,
      );

      throw error;
    }

    this._name = definition.name;
    this._definition = definition;
    this.integrationEventsService = integrationEventsService;
    this.eventBus = eventBus;
    this.flagResolver = flagResolver;
  }

  get name(): string {
    return this._name;
  }

  get definition(): IAddonDefinition {
    return this._definition;
  }

  async fetchRetry(
    url: string,
    options: any = {},
    retries: number = 1,
  ): Promise<Response> {
    let res: any;
    try {
      res = await fetch(url, {
        retry: {
          retries,
        },
        ...options,
      });
      return res;
    } catch (e) {
      const { method } = options;
      this.logger.warn(
        `Error querying ${url} with method ${method || 'GET'} status code ${e.code}`,
        e,
      );
      res = { status: e.code, ok: false };
    }

    return res;
  }

  abstract handleEvent(
    event: IEvent,
    parameters: any,
    integrationId: number,
  ): Promise<void>;

  async registerEvent(
    integrationEvent: IntegrationEventWriteModel,
  ): Promise<void> {
    await this.integrationEventsService.registerEvent(integrationEvent);
    this.eventBus.emit(ADDON_EVENTS_HANDLED, {
      result: integrationEvent.state,
      destination: this.name,
    });
  }

  destroy?(): void;
}
