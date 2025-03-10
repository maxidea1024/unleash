/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { StrategySchema } from './strategySchema';
import type { StrategiesSchemaVersion } from './strategiesSchemaVersion';

/**
 * List of strategies
 */
export interface StrategiesSchema {
  /** List of strategies */
  strategies: StrategySchema[];
  /** Version of the strategies schema */
  version: StrategiesSchemaVersion;
}
