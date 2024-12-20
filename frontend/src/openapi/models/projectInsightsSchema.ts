/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { FeatureTypeCountSchema } from './featureTypeCountSchema';
import type { ProjectInsightsSchemaHealth } from './projectInsightsSchemaHealth';
import type { ProjectDoraMetricsSchema } from './projectDoraMetricsSchema';
import type { ProjectInsightsSchemaMembers } from './projectInsightsSchemaMembers';
import type { ProjectStatsSchema } from './projectStatsSchema';

/**
 * A high-level overview of a project insights. It contains information such as project statistics, overall health, types of flags, members overview, change requests overview.
 */
export interface ProjectInsightsSchema {
  /** The number of features of each type */
  featureTypeCounts: FeatureTypeCountSchema[];
  /** Health summary of the project */
  health: ProjectInsightsSchemaHealth;
  /** Lead time (DORA) metrics */
  leadTime: ProjectDoraMetricsSchema;
  /** Active/inactive users summary */
  members: ProjectInsightsSchemaMembers;
  /** Project statistics */
  stats: ProjectStatsSchema;
}
