import type { Logger } from '../logger';
import type { IGanpaConfig } from '../types/options';
import type { IGanpaStores } from '../types/stores';
import type {
  IMinimalStrategy,
  IStrategy,
  IStrategyStore,
} from '../types/stores/strategy-store';
import NotFoundError from '../error/notfound-error';
import type EventService from '../features/events/event-service';
import {
  type IAuditUser,
  StrategyCreatedEvent,
  StrategyDeletedEvent,
  StrategyDeprecatedEvent,
  StrategyReactivatedEvent,
  StrategyUpdatedEvent,
} from '../types';

import strategySchema from './strategy-schema';
import NameExistsError from '../error/name-exists-error';

export default class StrategyService {
  private readonly logger: Logger;
  private readonly strategyStore: IStrategyStore;
  private readonly eventService: EventService;

  constructor(
    {
      strategyStore
    }: Pick<IGanpaStores, 'strategyStore'>,
    {
      getLogger
    }: Pick<IGanpaConfig, 'getLogger'>,
    eventService: EventService,
  ) {
    this.logger = getLogger('strategy-service.ts');

    this.strategyStore = strategyStore;
    this.eventService = eventService;
  }

  async getStrategies(): Promise<IStrategy[]> {
    return this.strategyStore.getAll();
  }

  async getStrategy(name: string): Promise<IStrategy> {
    return this.strategyStore.get(name);
  }

  async removeStrategy(
    strategyName: string,
    auditUser: IAuditUser,
  ): Promise<void> {
    const strategy = await this.strategyStore.get(strategyName);
    this.validateEditable(strategy);
    await this.strategyStore.delete(strategyName);
    await this.eventService.storeEvent(
      new StrategyDeletedEvent({
        data: {
          name: strategyName,
        },
        auditUser,
      }),
    );
  }

  async deprecateStrategy(
    strategyName: string,
    auditUser: IAuditUser,
  ): Promise<void> {
    if (await this.strategyStore.exists(strategyName)) {
      // Check existence
      await this.strategyStore.deprecateStrategy({ name: strategyName });
      await this.eventService.storeEvent(
        new StrategyDeprecatedEvent({
          data: {
            name: strategyName,
          },
          auditUser,
        }),
      );
    } else {
      throw new NotFoundError(
        `Could not find strategy with name ${strategyName}`,
      );
    }
  }

  async reactivateStrategy(
    strategyName: string,
    auditUser: IAuditUser,
  ): Promise<void> {
    await this.strategyStore.get(strategyName); // Check existence
    await this.strategyStore.reactivateStrategy({ name: strategyName });
    await this.eventService.storeEvent(
      new StrategyReactivatedEvent({
        data: {
          name: strategyName,
        },
        auditUser,
      }),
    );
  }

  async createStrategy(
    value: IMinimalStrategy,
    auditUser: IAuditUser,
  ): Promise<IStrategy> {
    const strategy = await strategySchema.validateAsync(value);
    strategy.deprecated = false;
    await this._validateStrategyName(strategy);
    await this.strategyStore.createStrategy(strategy);
    await this.eventService.storeEvent(
      new StrategyCreatedEvent({
        data: strategy,
        auditUser,
      }),
    );
    return this.strategyStore.get(strategy.name);
  }

  async updateStrategy(
    input: IMinimalStrategy,
    auditUser: IAuditUser,
  ): Promise<void> {
    const value = await strategySchema.validateAsync(input);
    const strategy = await this.strategyStore.get(input.name);
    this.validateEditable(strategy);
    await this.strategyStore.updateStrategy(value);
    await this.eventService.storeEvent(
      new StrategyUpdatedEvent({
        data: value,
        auditUser,
      }),
    );
  }

  private _validateStrategyName(
    data: Pick<IStrategy, 'name'>,
  ): Promise<Pick<IStrategy, 'name'>> {
    return new Promise((resolve, reject) => {
      this.strategyStore
        .get(data.name)
        .then(() =>
          reject(
            new NameExistsError(
              `Strategy with name ${data.name} already exist!`,
            ),
          ),
        )
        .catch(() => resolve(data));
    });
  }

  // This check belongs in the store.
  private validateEditable(strategy: IStrategy): void {
    if (!strategy.editable) {
      throw new Error(`Cannot edit strategy ${strategy.name}`);
    }
  }
}
