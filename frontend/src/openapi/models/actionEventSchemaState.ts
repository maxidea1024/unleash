/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * The state of the action. Can be one of `not started`, `started`, `success`, or `failed`.
 */
export type ActionEventSchemaState =
  (typeof ActionEventSchemaState)[keyof typeof ActionEventSchemaState];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ActionEventSchemaState = {
  not_started: 'not started',
  started: 'started',
  success: 'success',
  failed: 'failed',
} as const;
