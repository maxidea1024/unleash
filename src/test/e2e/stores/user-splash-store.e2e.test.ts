import type { IUserSplashStore } from '../../../lib/types/stores/user-splash-store';
import type { IUserStore } from '../../../lib/types/stores/user-store';
import dbInit, { type ITestDb } from '../helpers/database-init';
import getLogger from '../../fixtures/no-logger';
import type { IGanpaStores, IUser } from '../../../lib/types';

let stores: IGanpaStores;
let db: ITestDb;
let userSplashStore: IUserSplashStore;
let userStore: IUserStore;
let currentUser: IUser;

beforeAll(async () => {
  db = await dbInit('user_splash_store', getLogger);
  stores = db.stores;
  userSplashStore = stores.userSplashStore;
  userStore = stores.userStore;
  currentUser = await userStore.upsert({ email: 'me.feedback@mail.com' });
});

afterAll(async () => {
  await db.destroy();
});

afterEach(async () => {
  await userSplashStore.deleteAll();
});

test('should create userSplash', async () => {
  await userSplashStore.updateSplash({
    splashId: 'some-id',
    userId: currentUser.id,
    seen: false,
  });
  const userSplashs = await userSplashStore.getAllUserSplashes(currentUser.id);
  expect(userSplashs).toHaveLength(1);
  expect(userSplashs[0].splashId).toBe('some-id');
});

test('should get userSplash', async () => {
  await userSplashStore.updateSplash({
    splashId: 'some-id',
    userId: currentUser.id,
    seen: false,
  });
  const userSplash = await userSplashStore.getSplash(currentUser.id, 'some-id');
  expect(userSplash.splashId).toBe('some-id');
});

test('should exists', async () => {
  await userSplashStore.updateSplash({
    splashId: 'some-id-3',
    userId: currentUser.id,
    seen: false,
  });
  const exists = await userSplashStore.exists({
    userId: currentUser.id,
    splashId: 'some-id-3',
  });
  expect(exists).toBe(true);
});

test('should not exists', async () => {
  const exists = await userSplashStore.exists({
    userId: currentUser.id,
    splashId: 'some-id-not-here',
  });
  expect(exists).toBe(false);
});

test('should get all userSplashs', async () => {
  await userSplashStore.updateSplash({
    splashId: 'some-id-2',
    userId: currentUser.id,
    seen: false,
  });
  const userSplashs = await userSplashStore.getAll();
  expect(userSplashs).toHaveLength(1);
  expect(userSplashs[0].splashId).toBe('some-id-2');
});
