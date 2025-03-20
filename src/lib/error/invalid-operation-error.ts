import { GanpaError } from './ganpa-error';

export default class InvalidOperationError extends GanpaError {
  statusCode = 403;
}
