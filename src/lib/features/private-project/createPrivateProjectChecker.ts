import type { Db, IGanpaConfig } from '../../server-impl';
import PrivateProjectStore from './privateProjectStore';
import { PrivateProjectChecker } from './privateProjectChecker';
import { FakePrivateProjectChecker } from './fakePrivateProjectChecker';

export const createPrivateProjectChecker = (
  db: Db,
  config: IGanpaConfig,
): PrivateProjectChecker => {
  const { getLogger } = config;
  const privateProjectStore = new PrivateProjectStore(db, getLogger);

  return new PrivateProjectChecker(
    {
      privateProjectStore: privateProjectStore,
    },
    config,
  );
};

export const createFakePrivateProjectChecker =
  (): FakePrivateProjectChecker => {
    return new FakePrivateProjectChecker();
  };
