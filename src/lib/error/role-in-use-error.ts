import { GanpaError } from './ganpa-error';

export default class RoleInUseError extends GanpaError {
  statusCode = 400;
}
