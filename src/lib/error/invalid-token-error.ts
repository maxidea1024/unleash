import { GanpaError } from './ganpa-error';

export default class InvalidTokenError extends GanpaError {
  statusCode = 401;

  constructor() {
    super('Token was not valid');
  }
}
