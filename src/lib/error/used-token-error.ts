import { UnleashError } from './unleash-error';

export default class UsedTokenError extends UnleashError {
  statusCode = 403;

  constructor(usedAt: Date) {
    super(`Token was already used at ${usedAt}`);
  }
}
