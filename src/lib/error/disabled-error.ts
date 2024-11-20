import { UnleashError } from './unleash-error';

export default class DisabledError extends UnleashError {
  statusCode = 422;
}
