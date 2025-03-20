import { GanpaError } from './ganpa-error';

export default class OperationDeniedError extends GanpaError {
  statusCode = 403;
}
