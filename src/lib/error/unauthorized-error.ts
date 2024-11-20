import { UnleashError } from './unleash-error';

export default class UnauthorizedError extends UnleashError {
  statusCode = 401;
}
