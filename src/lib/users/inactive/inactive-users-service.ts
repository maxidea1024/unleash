import {
  type IAuditUser,
  type IGanpaConfig,
  type IGanpaStores,
  serializeDates,
} from '../../types';
import type { IInactiveUsersStore } from './types/inactive-users-store-type';
import type { Logger } from '../../logger';
import type { InactiveUserSchema } from '../../openapi';
import type { UserService } from '../../services';

export class InactiveUsersService {
  private readonly inactiveUsersStore: IInactiveUsersStore;
  private readonly logger: Logger;
  private readonly userService: UserService;
  private readonly userInactivityThresholdInDays: number;

  constructor(
    {
      inactiveUsersStore
    }: Pick<IGanpaStores, 'inactiveUsersStore'>,
    {
      getLogger,
      userInactivityThresholdInDays,
    }: Pick<IGanpaConfig, 'getLogger' | 'userInactivityThresholdInDays'>,
    services: {
      userService: UserService;
    },
  ) {
    this.logger = getLogger('inactive-users-service.ts');

    this.inactiveUsersStore = inactiveUsersStore;
    this.userService = services.userService;
    this.userInactivityThresholdInDays = userInactivityThresholdInDays;
  }

  async getInactiveUsers(): Promise<InactiveUserSchema[]> {
    const users = await this.inactiveUsersStore.getInactiveUsers(
      this.userInactivityThresholdInDays,
    );
    if (users.length === 0) {
      return [];
    }

    return users.map((user) => {
      return serializeDates({
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        seenAt: user.seen_at,
        createdAt: user.created_at,
        patSeenAt: user.pat_seen_at,
      });
    });
  }

  async deleteInactiveUsers(
    calledByUser: IAuditUser,
    userIds: number[],
  ): Promise<void> {
    this.logger.info('Deleting inactive users');

    for (const userid of userIds) {
      if (calledByUser.id !== userid) {
        await this.userService.deleteUser(userid, calledByUser);
      }
    }
  }
}
