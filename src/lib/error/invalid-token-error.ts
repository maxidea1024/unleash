import { UnleashError } from './unleash-error';

export default class InvalidTokenError extends UnleashError {
  statusCode = 401;

  constructor() {
    super('Token was not valid');
  }
}
