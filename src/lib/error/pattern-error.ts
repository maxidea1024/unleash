import { type ApiErrorSchema, UnleashError } from './unleash-error';

export default class PatternError extends UnleashError {
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
