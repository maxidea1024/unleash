import { GanpaError } from './ganpa-error';

export default class DisabledError extends GanpaError {
  statusCode = 422;
}
