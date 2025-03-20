import { InactiveUsersService } from './inactive-users-service';
import type { IGanpaConfig } from '../../server-impl';
import type { Db } from '../../server-impl';
import { InactiveUsersStore } from './inactive-users-store';
import { FakeInactiveUsersStore } from './fakes/fake-inactive-users-store';
import type { UserService } from '../../services';

export const createInactiveUsersService = (
  db: Db,
  config: IGanpaConfig,
  userService: UserService,
): InactiveUsersService => {
  const { eventBus, getLogger, userInactivityThresholdInDays } = config;
  const inactiveUsersStore = new InactiveUsersStore(db, eventBus, getLogger);

  return new InactiveUsersService(
    { inactiveUsersStore },
    { getLogger, userInactivityThresholdInDays },
    { userService },
  );
};

export const createFakeInactiveUsersService = (
  {
    getLogger,
    userInactivityThresholdInDays,
  }: Pick<IGanpaConfig, 'getLogger' | 'userInactivityThresholdInDays'>,
  userService: UserService,
): InactiveUsersService => {
  const fakeStore = new FakeInactiveUsersStore();
  return new InactiveUsersService(
    { inactiveUsersStore: fakeStore },
    { getLogger, userInactivityThresholdInDays },
    { userService },
  );
};
