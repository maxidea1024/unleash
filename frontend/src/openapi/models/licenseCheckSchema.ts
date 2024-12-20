/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * A model representing a license check response.
 */
export interface LicenseCheckSchema {
  /** Whether or not the current Unleash license is considered valid */
  isValid: boolean;
  /** Message describing the current state of the Unleash license */
  message?: string;
}
