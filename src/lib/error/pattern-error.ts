import { type ApiErrorSchema, GanpaError } from './ganpa-error';

export default class PatternError extends GanpaError {
  statusCode = 400;

  private readonly details?: { message: string }[];

  constructor(message: string, details?: string[]) {
    super(message);

    this.details = details?.map((description) => ({
      message: description,
    }));
  }

  toJSON(): ApiErrorSchema {
    return {
      ...super.toJSON(),
      details: this.details,
    };
  }
}
