import type { Logger } from '../logger';
import type { IUnleashStores } from '../types/stores';
import type { IUnleashConfig } from '../types/options';
import type { IUser } from '../types/user';
import type { IUserSplash, IUserSplashStore } from '../types/stores/user-splash-store';

export default class UserSplashService {
  private readonly userSplashStore: IUserSplashStore;
  private readonly logger: Logger;

  constructor(
    { userSplashStore }: Pick<IUnleashStores, 'userSplashStore'>,
    { getLogger }: Pick<IUnleashConfig, 'getLogger'>,
  ) {
    this.logger = getLogger('user-splash-service.ts');

    this.userSplashStore = userSplashStore;
  }

  async getAllUserSplashes(user: IUser): Promise<Record<string, boolean>> {
    if (user.isAPI) {
      return {};
    }

    try {
      return (await this.userSplashStore.getAllUserSplashes(user.id)).reduce(
        (splashObject, splash) => ({
          ...splashObject,
          [splash.splashId]: splash.seen,
        }),
        {},
      );
    } catch (err) {
      this.logger.error(err);
      return {};
    }
  }

  async getSplash(user_id: number, splash_id: string): Promise<IUserSplash> {
    return this.userSplashStore.getSplash(user_id, splash_id);
  }

  async updateSplash(splash: IUserSplash): Promise<IUserSplash> {
    return this.userSplashStore.updateSplash(splash);
  }
}
