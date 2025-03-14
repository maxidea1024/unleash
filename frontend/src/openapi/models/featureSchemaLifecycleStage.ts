/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * The name of the current lifecycle stage
 */
export type FeatureSchemaLifecycleStage =
  (typeof FeatureSchemaLifecycleStage)[keyof typeof FeatureSchemaLifecycleStage];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FeatureSchemaLifecycleStage = {
  initial: 'initial',
  'pre-live': 'pre-live',
  live: 'live',
  completed: 'completed',
  archived: 'archived',
} as const;
