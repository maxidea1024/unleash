import merge from 'deepmerge';
import {
  AuthType,
  type IGanpaConfig,
  type IGanpaOptions,
} from '../../lib/types/options';
import getLogger from '../fixtures/no-logger';
import { createConfig } from '../../lib/create-config';
import path from 'path';

function mergeAll<T>(objects: Partial<T>[]): T {
  return merge.all<T>(objects.filter((i) => i));
}

export function createTestConfig(config?: IGanpaOptions): IGanpaConfig {
  getLogger.setMuteError(true);
  const testConfig: IGanpaOptions = {
    getLogger,
    authentication: { type: AuthType.NONE, createAdminUser: false },
    server: { secret: 'really-secret' },
    session: { db: false },
    versionCheck: { enable: false },
    disableScheduler: true,
    clientFeatureCaching: {
      enabled: false,
    },
    experimental: {
      flags: {
        embedProxy: true,
        embedProxyFrontend: true,
      },
    },
    publicFolder: path.join(__dirname, '../examples'),
  };
  const options = mergeAll<IGanpaOptions>([testConfig, config || {}]);
  return createConfig(options);
}
