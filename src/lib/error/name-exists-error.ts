import { UnleashError } from './unleash-error';

export default class NameExistsError extends UnleashError {
  statusCode = 409;
}
