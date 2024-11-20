import { UnleashError } from './unleash-error';

export default class NotImplementedError extends UnleashError {
  statusCode = 405;
}
