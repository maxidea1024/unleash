/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * A model representing a single login event.
 */
export interface LoginEventSchema {
  /** The authentication type used to log in. */
  auth_type?: string;
  /** The date and time of when the login was attempted. */
  created_at?: string;
  /**
   * The reason for the login failure. This property is only present if the login was unsuccessful.
   * @nullable
   */
  failure_reason?: string | null;
  /**
   * The event's ID. Event IDs are incrementing integers. In other words, a more recent event will always have a higher ID than an older event.
   * @minimum 1
   */
  id: number;
  /**
   * The IP address of the client that attempted to log in.
   * @nullable
   */
  ip?: string | null;
  /** Whether the login was successful or not. */
  successful?: boolean;
  /** The username of the user that attempted to log in. Will return "Incorrectly configured provider" when attempting to log in using a misconfigured provider. */
  username?: string;
}
