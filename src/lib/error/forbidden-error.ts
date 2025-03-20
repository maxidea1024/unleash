import { GanpaError } from './ganpa-error';

export default class ForbiddenError extends GanpaError {
  statusCode = 403;
}
