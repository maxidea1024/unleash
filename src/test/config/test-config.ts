import merge from 'deepmerge';
import {
  AuthType,
  type IUnleashConfig,
  type IUnleashOptions,
} from '../../lib/types/options';
import getLogger from '../fixtures/no-logger';
import { createConfig } from '../../lib/create-config';
import path from 'path';

function mergeAll<T>(objects: Partial<T>[]): T {
  return merge.all<T>(objects.filter((i) => i));
}

export function createTestConfig(config?: IUnleashOptions): IUnleashConfig {
  getLogger.setMuteError(true);
  const testConfig: IUnleashOptions = {
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
  const options = mergeAll<IUnleashOptions>([testConfig, config || {}]);
  return createConfig(options);
}
