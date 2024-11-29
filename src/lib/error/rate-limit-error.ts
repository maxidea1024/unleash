import { UnleashError } from './unleash-error';

export default class RateLimitError extends UnleashError {
  statusCode = 429;

  constructor(
    message: string = `We're currently receiving too much traffic. Please try again later.`,
  ) {
    super(message);
  }
}
