import { GanpaError } from './ganpa-error';

export default class UnauthorizedError extends GanpaError {
  statusCode = 401;
}
