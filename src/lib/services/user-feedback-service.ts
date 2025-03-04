import type { Logger } from '../logger';
import type { IUnleashStores } from '../types/stores';
import type { IUnleashConfig } from '../types/options';
import type { IUser } from '../types/user';
import type {
  IUserFeedback,
  IUserFeedbackStore,
} from '../types/stores/user-feedback-store';

export default class UserFeedbackService {
  private readonly userFeedbackStore: IUserFeedbackStore;
  private readonly logger: Logger;

  constructor(
    {
      userFeedbackStore
    }: Pick<IUnleashStores, 'userFeedbackStore'>,
    {
      getLogger
    }: Pick<IUnleashConfig, 'getLogger'>,
  ) {
    this.logger = getLogger('user-feedback-service.ts');

    this.userFeedbackStore = userFeedbackStore;
  }

  async getAllUserFeedback(user: IUser): Promise<IUserFeedback[]> {
    if (user.isAPI) {
      return [];
    }

    try {
      return await this.userFeedbackStore.getAllUserFeedback(user.id);
    } catch (err) {
      this.logger.error('Cannot read user feedback', err);
      return [];
    }
  }

  async getFeedback(
    user_id: number,
    feedback_id: string,
  ): Promise<IUserFeedback> {
    return this.userFeedbackStore.getFeedback(user_id, feedback_id);
  }

  async updateFeedback(feedback: IUserFeedback): Promise<IUserFeedback> {
    return this.userFeedbackStore.updateFeedback(feedback);
  }
}
