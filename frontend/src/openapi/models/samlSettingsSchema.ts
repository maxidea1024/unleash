/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { SamlSettingsSchemaOneOf } from './samlSettingsSchemaOneOf';
import type { SamlSettingsSchemaOneOfThree } from './samlSettingsSchemaOneOfThree';

/**
 * Settings used to authenticate via SAML
 */
export type SamlSettingsSchema =
  | SamlSettingsSchemaOneOf
  | SamlSettingsSchemaOneOfThree;
