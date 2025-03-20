import type { TestResult } from 'owasp-password-strength-test';
import { type ApiErrorSchema, GanpaError } from './ganpa-error';

type ValidationError = {
  validationErrors: string[];
  message: string;
};

export default class OwaspValidationError extends GanpaError {
  statusCode = 400;

  private readonly details: [ValidationError];

  constructor(testResult: TestResult) {
    super(testResult.errors[0]);

    const details = {
      validationErrors: testResult.errors,
      message: testResult.errors[0],
    };
    this.details = [details];
  }

  toJSON(): ApiErrorSchema {
    return {
      ...super.toJSON(),
      details: this.details,
    };
  }
}
