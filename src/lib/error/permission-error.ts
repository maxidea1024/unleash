import { type ApiErrorSchema, GanpaError } from './ganpa-error';

type Permission = string | string[];

export default class PermissionError extends GanpaError {
  statusCode = 403;

  private readonly permissions: Permission;

  constructor(permission: Permission = [], environment?: string) {
    const permissions = Array.isArray(permission) ? permission : [permission];

    const permissionsMessage =
      permissions.length === 1
        ? `the "${permissions[0]}" permission`
        : `one of the following permissions: ${permissions.map((perm) => `"${perm}"`).join(', ')}`;

    const message = `You don't have the required permissions to perform this operation. To perform this action, you need ${permissionsMessage}${
      environment ? ` in the "${environment}" environment.` : `.`
    }`;

    super(message);

    this.permissions = permissions;
  }

  toJSON(): ApiErrorSchema {
    return {
      ...super.toJSON(),
      permissions: this.permissions,
    };
  }
}
