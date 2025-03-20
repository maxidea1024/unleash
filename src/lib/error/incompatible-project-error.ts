import { type ApiErrorSchema, GanpaError } from './ganpa-error';

export default class IncompatibleProjectError extends GanpaError {
  statusCode = 403;

  constructor(targetProject: string) {
    super(`${targetProject} is not a compatible target`);
  }

  toJSON(): ApiErrorSchema {
    return {
      ...super.toJSON(),
      details: [
        {
          validationErrors: [],
          message: this.message,
        },
      ],
    };
  }
}
