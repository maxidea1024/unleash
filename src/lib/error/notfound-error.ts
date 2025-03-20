import { GanpaError } from './ganpa-error';

export default class NotFoundError extends GanpaError {
  statusCode = 404;

  constructor(message: string = 'The requested resource could not be found') {
    super(message);
  }
}
