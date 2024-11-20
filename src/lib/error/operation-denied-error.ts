import { UnleashError } from './unleash-error';

export default class OperationDeniedError extends UnleashError {
  statusCode = 403;
}
