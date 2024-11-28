import { Strategy } from './strategy';
import type { Context } from '../context';

export default class UserWithIdStrategy extends Strategy {
  constructor() {
    super('userWithId');
  }

  isEnabled(parameters: { userIds?: string }, context: Context): boolean {
    if (!context.userId) {
      return false;
    }

    const userIdList = parameters.userIds ? parameters.userIds.split(/\s*,\s*/) : [];
    return userIdList.includes(context.userId);
  }
}
