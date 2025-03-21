import type { IGanpaConfig } from '../../types';
import type { Db } from '../../db/db';
import { OnboardingService } from './onboarding-service';
import { OnboardingStore } from './onboarding-store';
import { ProjectReadModel } from '../project/project-read-model';
import UserStore from '../../db/user-store';
import FakeUserStore from '../../../test/fixtures/fake-user-store';
import { FakeProjectReadModel } from '../project/fake-project-read-model';
import { FakeOnboardingStore } from './fake-onboarding-store';

export const createOnboardingService =
  (config: IGanpaConfig) =>
  (db: Db): OnboardingService => {
    const { eventBus, flagResolver, getLogger } = config;
    const onboardingStore = new OnboardingStore(db);
    const projectReadModel = new ProjectReadModel(db, eventBus, flagResolver);
    const userStore = new UserStore(db, getLogger, flagResolver);
    const onboardingService = new OnboardingService(
      {
        onboardingStore,
        projectReadModel,
        userStore,
      },
      config,
    );

    return onboardingService;
  };

export const createFakeOnboardingService = (config: IGanpaConfig) => {
  const onboardingStore = new FakeOnboardingStore();
  const projectReadModel = new FakeProjectReadModel();
  const userStore = new FakeUserStore();
  const onboardingService = new OnboardingService(
    {
      onboardingStore,
      projectReadModel,
      userStore,
    },
    config,
  );

  return { onboardingService, projectReadModel, userStore, onboardingStore };
};
