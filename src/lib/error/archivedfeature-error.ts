import { GanpaError } from './ganpa-error';

export default class ArchivedFeatureError extends GanpaError {
  statusCode = 400;

  constructor(
    message: string = 'Cannot perform this operation on archived features',
  ) {
    super(message);
  }
}
