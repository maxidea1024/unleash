/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * Signals that this strategy could not be evaluated. This is most likely because you're using a custom strategy that Unleash doesn't know about. The `unevaluated` result is also returned if the strategy is disabled.
 */
export type PlaygroundStrategySchemaResultAnyOfEvaluationStatus =
  (typeof PlaygroundStrategySchemaResultAnyOfEvaluationStatus)[keyof typeof PlaygroundStrategySchemaResultAnyOfEvaluationStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const PlaygroundStrategySchemaResultAnyOfEvaluationStatus = {
  incomplete: 'incomplete',
  unevaluated: 'unevaluated',
} as const;
