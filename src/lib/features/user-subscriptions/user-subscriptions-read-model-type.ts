export interface ISubscriber {
  name: string;
  email: string;
};

export interface IUserSubscriptionsReadModel {
  getSubscribedUsers(subscription: string): Promise<ISubscriber[]>;
  getUserSubscriptions(userId: number): Promise<string[]>;
}

export const SUBSCRIPTION_TYPES = ['productivity-report'] as const;
