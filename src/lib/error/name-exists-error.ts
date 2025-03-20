import { GanpaError } from './ganpa-error';

export default class NameExistsError extends GanpaError {
  statusCode = 409;
}
