import type { CreateFeatureStrategySchema } from '../../../lib/openapi';
import type { IGanpaTest } from './test-helper';

export const FEATURES_BASE_PATH = '/api/admin/projects/default/features';
export const ADMIN_BASE_PATH = '/api/admin';

export const createFeatureFlag = (
  app: IGanpaTest,
  postData: object,
  expectStatusCode = 201,
): Promise<unknown> =>
  app.request.post(FEATURES_BASE_PATH).send(postData).expect(expectStatusCode);

export const addStrategyToFeatureEnv = (
  app: IGanpaTest,
  postData: CreateFeatureStrategySchema,
  envName: string,
  featureName: string,
  expectStatusCode = 200,
): Promise<any> => {
  const url = `${ADMIN_BASE_PATH}/projects/default/features/${featureName}/environments/${envName}/strategies`;
  return app.request.post(url).send(postData).expect(expectStatusCode);
};
