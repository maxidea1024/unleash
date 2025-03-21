import { type IGanpaTest, setupAppWithAuth } from '../../helpers/test-helper';
import metricsExample from '../../../examples/client-metrics.json';
import dbInit, { type ITestDb } from '../../helpers/database-init';
import getLogger from '../../../fixtures/no-logger';
import { ApiTokenType } from '../../../../lib/types/models/api-token';

let app: IGanpaTest;
let db: ITestDb;

beforeAll(async () => {
  db = await dbInit('metrics_api_e2e_access_client', getLogger);
  app = await setupAppWithAuth(db.stores, undefined, db.rawDatabase);
});

afterAll(async () => {
  await app.destroy();
  await db.destroy();
});

test('should enrich metrics with environment from api-token', async () => {
  const { apiTokenService } = app.services;
  const { environmentStore, clientMetricsStoreV2 } = db.stores;

  await environmentStore.create({
    name: 'some',
    type: 'test',
  });

  const token = await apiTokenService.createApiToken({
    type: ApiTokenType.CLIENT,
    tokenName: 'test',
    environment: 'some',
    project: '*',
  });

  await app.request
    .post('/api/client/metrics')
    .set('Authorization', token.secret)
    .send(metricsExample)
    .expect(202);

  await app.services.clientMetricsService.bulkAdd();
  const all = await clientMetricsStoreV2.getAll();
  expect(all[0].environment).toBe('some');
});
