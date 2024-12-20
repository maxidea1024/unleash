/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

export type ProjectAccessConfigurationSchemaRolesItem = {
  /** A list of group ids that will be assigned this role */
  groups?: number[];
  /**
   * The id of the role.
   * @minimum 1
   */
  id?: number;
  /** A list of user ids that will be assigned this role */
  users?: number[];
};
