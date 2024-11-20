import { UnleashError } from './unleash-error';

export default class RoleInUseError extends UnleashError {
  statusCode = 400;
}
