import { log } from 'db-migrate-shared';
import { getInstance } from 'db-migrate';
import type { IGanpaConfig } from './lib/types/options';
import { secondsToMilliseconds } from 'date-fns';

log.setLogLevel('error');

export async function migrateDb({ db }: IGanpaConfig): Promise<void> {
  const custom = {
    ...db,
    connectionTimeoutMillis: secondsToMilliseconds(10),
  };

  // disable Intellij/WebStorm from setting verbose CLI argument to db-migrator
  process.argv = process.argv.filter((it) => !it.includes('--verbose'));
  const dbm = getInstance(true, {
    cwd: __dirname,
    config: { custom },
    env: 'custom',
  });

  return dbm.up();
}

// This exists to ease testing
export async function resetDb({ db }: IGanpaConfig): Promise<void> {
  const custom = {
    ...db,
    connectionTimeoutMillis: secondsToMilliseconds(10),
  };

  const dbm = getInstance(true, {
    cwd: __dirname,
    config: { custom },
    env: 'custom',
  });

  return dbm.reset();
}
