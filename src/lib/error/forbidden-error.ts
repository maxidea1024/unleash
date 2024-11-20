import { UnleashError } from './unleash-error';

export default class ForbiddenError extends UnleashError {
  statusCode = 403;
}
