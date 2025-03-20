import { type ApiErrorSchema, GanpaError } from './ganpa-error';

export default class PasswordUndefinedError extends GanpaError {
  statusCode = 400;

  constructor() {
    super('Password cannot be empty or undefined');
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
