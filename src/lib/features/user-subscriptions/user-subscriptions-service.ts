import {
  UserPreferenceUpdatedEvent,
  type IGanpaConfig,
  type IGanpaStores,
} from '../../types';
import type { Logger } from '../../logger';
import type { IAuditUser } from '../../types/user';
import type {
  IUserUnsubscribeStore,
  IUnsubscribeEntry,
} from './user-unsubscribe-store-type';
import type EventService from '../events/event-service';
import type { IUserSubscriptionsReadModel } from './user-subscriptions-read-model-type';

export class UserSubscriptionsService {
  private readonly userUnsubscribeStore: IUserUnsubscribeStore;
  private readonly userSubscriptionsReadModel: IUserSubscriptionsReadModel;
  private readonly eventService: EventService;
  private readonly logger: Logger;

  constructor(
    {
      userUnsubscribeStore,
      userSubscriptionsReadModel,
    }: Pick<
      IGanpaStores,
      'userUnsubscribeStore' | 'userSubscriptionsReadModel'
    >,
    { getLogger }: Pick<IGanpaConfig, 'getLogger'>,
    eventService: EventService,
  ) {
    this.logger = getLogger('user-subscription-service.ts');

    this.userUnsubscribeStore = userUnsubscribeStore;
    this.userSubscriptionsReadModel = userSubscriptionsReadModel;
    this.eventService = eventService;
  }

  async getUserSubscriptions(userId: number) {
    return this.userSubscriptionsReadModel.getUserSubscriptions(userId);
  }

  async subscribe(
    userId: number,
    subscription: string,
    auditUser: IAuditUser,
  ): Promise<void> {
    const entry: IUnsubscribeEntry = {
      userId,
      subscription,
    };

    await this.userUnsubscribeStore.delete(entry);
    await this.eventService.storeEvent(
      new UserPreferenceUpdatedEvent({
        userId,
        data: { subscription, action: 'subscribed' },
        auditUser,
      }),
    );
  }

  async unsubscribe(
    userId: number,
    subscription: string,
    auditUser: IAuditUser,
  ): Promise<void> {
    const entry: IUnsubscribeEntry = {
      userId,
      subscription,
    };

    await this.userUnsubscribeStore.insert(entry);
    await this.eventService.storeEvent(
      new UserPreferenceUpdatedEvent({
        userId,
        data: { subscription, action: 'unsubscribed' },
        auditUser,
      }),
    );
  }
}
