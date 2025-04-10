import dbInit, {
  type ITestDb,
} from '../../../../test/e2e/helpers/database-init';
import {
  type IGanpaTest,
  setupAppWithCustomConfig,
} from '../../../../test/e2e/helpers/test-helper';
import getLogger from '../../../../test/fixtures/no-logger';

let app: IGanpaTest;
let db: ITestDb;

beforeAll(async () => {
  db = await dbInit('archive_test_serial', getLogger);
  app = await setupAppWithCustomConfig(
    db.stores,
    {
      experimental: {
        flags: {
          strictSchemaValidation: true,
        },
      },
    },
    db.rawDatabase,
  );
});

afterAll(async () => {
  await app.destroy();
  await db.destroy();
});

test('Should get empty features via admin', async () => {
  await app.request
    .get('/api/admin/archive/features')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.body.features).toHaveLength(0);
    });
});

test('Should be allowed to reuse deleted toggle name', async () => {
  await app.request
    .post('/api/admin/projects/default/features')
    .send({
      name: 'ts.really.delete',
      archived: true,
    })
    .expect(201);
  await app.request
    .post('/api/admin/features/validate')
    .send({ name: 'ts.really.delete' })
    .expect(409);
  await app.request.delete('/api/admin/archive/ts.really.delete').expect(200);
  await app.request
    .post('/api/admin/features/validate')
    .send({ name: 'ts.really.delete' })
    .expect(200);
});

test('Should get archived toggles via admin', async () => {
  await app.request
    .post('/api/admin/projects/default/features')
    .send({
      name: 'archived.test.1',
      archived: true,
    })
    .expect(201);
  await app.request
    .post('/api/admin/projects/default/features')
    .send({
      name: 'archived.test.2',
      archived: true,
    })
    .expect(201);
  await app.request
    .get('/api/admin/archive/features')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.body.features).toHaveLength(2);
    });
});

test('Should get archived toggles via project', async () => {
  await db.stores.featureToggleStore.deleteAll();

  await db.stores.projectStore.create({
    id: 'proj-1',
    name: 'proj-1',
    description: '',
    mode: 'open' as const,
  });
  await db.stores.projectStore.create({
    id: 'proj-2',
    name: 'proj-2',
    description: '',
    mode: 'open' as const,
  });

  await db.stores.featureToggleStore.create('proj-1', {
    name: 'feat-proj-1',
    archived: true,
    createdByUserId: 9999,
  });
  await db.stores.featureToggleStore.create('proj-2', {
    name: 'feat-proj-2',
    archived: true,
    createdByUserId: 9999,
  });
  await db.stores.featureToggleStore.create('proj-2', {
    name: 'feat-proj-2-2',
    archived: true,
    createdByUserId: 9999,
  });

  await app.request
    .get('/api/admin/archive/features/proj-1')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.body.features).toHaveLength(1);
    });

  await app.request
    .get('/api/admin/archive/features/proj-2')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.body.features).toHaveLength(2);
    });

  await app.request
    .get('/api/admin/archive/features')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.body.features).toHaveLength(3);
    });
});

test('Should be able to revive toggle', async () => {
  await app.request.post('/api/admin/projects/default/features').send({
    name: 'archived.revival',
    archived: true,
  });
  await app.request
    .post('/api/admin/archive/revive/archived.revival')
    .send({})
    .expect(200);
});

test('Should disable all environments when reviving a toggle', async () => {
  await db.stores.featureToggleStore.deleteAll();
  await db.stores.featureToggleStore.create('default', {
    name: 'feat-proj-1',
    archived: true,
    createdByUserId: 9999,
  });

  await db.stores.environmentStore.create({
    name: 'development',
    enabled: true,
    type: 'development',
    sortOrder: 1,
  });

  await db.stores.environmentStore.create({
    name: 'production',
    enabled: true,
    type: 'production',
    sortOrder: 2,
  });

  await db.stores.featureEnvironmentStore.addEnvironmentToFeature(
    'feat-proj-1',
    'default',
    true,
  );
  await db.stores.featureEnvironmentStore.addEnvironmentToFeature(
    'feat-proj-1',
    'production',
    true,
  );
  await db.stores.featureEnvironmentStore.addEnvironmentToFeature(
    'feat-proj-1',
    'development',
    true,
  );
  await app.request
    .post('/api/admin/archive/revive/feat-proj-1')
    .send({})
    .expect(200);

  const { body } = await app.request
    .get(
      '/api/admin/projects/default/features/feat-proj-1?variantEnvironments=true',
    )
    .expect(200);

  expect(body.environments.every((env) => !env.enabled));
});

test('Reviving a non-existing toggle should yield 404', async () => {
  await app.request
    .post('/api/admin/archive/revive/non.existing')
    .send({})
    .expect(404);
});
