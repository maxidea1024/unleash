/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * The type of authentication enabled for this Unleash instance
 */
export type UiConfigSchemaAuthenticationType =
  (typeof UiConfigSchemaAuthenticationType)[keyof typeof UiConfigSchemaAuthenticationType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const UiConfigSchemaAuthenticationType = {
  'open-source': 'open-source',
  demo: 'demo',
  enterprise: 'enterprise',
  hosted: 'hosted',
  custom: 'custom',
  none: 'none',
} as const;
