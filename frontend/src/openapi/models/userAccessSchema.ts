/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * Describes a single set of access for a user
 */
export interface UserAccessSchema {
  /** A list of project ids that this user has access to */
  accessibleProjects: string[];
  /**
   * When the user was created
   * @nullable
   */
  createdAt?: string | null;
  /** A list of group names that this user is a member of */
  groups: string[];
  /**
   * The last time the user logged in
   * @nullable
   */
  lastSeen?: string | null;
  /** The name of the root role that this user has */
  rootRole: string;
  /** The email address of the user */
  userEmail: string;
  /** The identifier for the user */
  userId: number;
  /**
   * The name of the user
   * @nullable
   */
  userName?: string | null;
}
