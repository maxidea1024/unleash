import { UnleashError } from './unleash-error';

export default class FeatureHasTagError extends UnleashError {
  statusCode = 409;
}
