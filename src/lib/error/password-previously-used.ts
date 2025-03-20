import { GanpaError } from './ganpa-error';

export default class PasswordPreviouslyUsedError extends GanpaError {
  statusCode = 400;

  constructor(
    message: string = `You've previously used this password. Please use a new password.`,
  ) {
    super(message);
  }
}
