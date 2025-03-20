import { GanpaError } from './ganpa-error';

export default class PasswordMismatch extends GanpaError {
  statusCode = 401;

  constructor(message: string = 'Wrong password, try again.') {
    super(message);
  }
}
