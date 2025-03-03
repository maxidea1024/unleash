/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * Describes the properties required to create or update a signal endpoint.
 */
export interface CreateSignalEndpointSchema {
  /**
   * A more detailed description of the signal endpoint and its intended use.
   * @nullable
   */
  description?: string | null;
  /** Whether the signal endpoint is currently enabled. If not specified, defaults to true. */
  enabled?: boolean;
  /** The signal endpoint name. Must be URL-safe. */
  name: string;
}
