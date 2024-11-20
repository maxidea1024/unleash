import { UnleashError } from './unleash-error';

export default class MinimumOneEnvironmentError extends UnleashError {
  statusCode = 400;
}
