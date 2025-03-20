import { GanpaError } from './ganpa-error';

export default class FeatureHasTagError extends GanpaError {
  statusCode = 409;
}
