import { GanpaError } from './ganpa-error';

export default class UsedTokenError extends GanpaError {
  statusCode = 403;

  constructor(usedAt: Date) {
    super(`Token was already used at ${usedAt}`);
  }
}
