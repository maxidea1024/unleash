import { UnleashError } from './unleash-error';

export default class InvalidOperationError extends UnleashError {
  statusCode = 403;
}
