/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

export type InstanceInsightsSchemaEnvironmentTypeTrendsItem = {
  /** A UTC date when the stats were captured. Time is the very end of a given day. */
  date: string;
  /** Environment type the data belongs too */
  environmentType: string;
  /** Total number of times configuration has been updated in the environment type  */
  totalUpdates: number;
  /** Year and week in a given year for which the stats were calculated */
  week: string;
};
