import { GanpaError } from './ganpa-error';

export default class NotImplementedError extends GanpaError {
  statusCode = 405;
}
