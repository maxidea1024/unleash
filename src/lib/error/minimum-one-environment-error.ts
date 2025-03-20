import { GanpaError } from './ganpa-error';

export default class MinimumOneEnvironmentError extends GanpaError {
  statusCode = 400;
}
