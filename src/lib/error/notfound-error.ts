import { UnleashError } from './unleash-error';

export default class NotFoundError extends UnleashError {
  statusCode = 404;

  constructor(message: string = 'The requested resource could not be found') {
    super(message);
  }
}
