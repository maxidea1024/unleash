import { knex, type Knex } from 'knex';
import type { IGanpaConfig } from '../types/options';

export function createDb({
  db,
  getLogger,
}: Pick<IGanpaConfig, 'db' | 'getLogger'>): Knex {
  const logger = getLogger('db-pool.ts');

  return knex({
    client: 'pg',
    version: db.version,
    connection: {
      ...db,
      application_name: db.applicationName,
    },
    pool: db.pool,
    searchPath: db.schema,
    asyncStackTraces: true,
    log: {
      debug: (msg) => logger.debug(msg),
      warn: (msg) => logger.warn(msg),
      error: (msg) => logger.error(msg),
    },
  });
}
