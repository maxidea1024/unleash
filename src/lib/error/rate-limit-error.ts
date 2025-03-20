import { GanpaError } from './ganpa-error';

export default class RateLimitError extends GanpaError {
  statusCode = 429;

  constructor(
    message: string = `We're currently receiving too much traffic. Please try again later.`,
  ) {
    super(message);
  }
}
