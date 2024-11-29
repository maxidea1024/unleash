import { type ApiErrorSchema, UnleashError } from './unleash-error';

export default class ProjectWithoutOwnerError extends UnleashError {
  statusCode = 409;

  constructor() {
    super('A project must have at least one owner'); // TODO: localization은 어떻게 할수 있나?
  }

  toJSON(): ApiErrorSchema {
    return {
      ...super.toJSON(),
      details: [
        {
          message: this.message,
          validationErrors: [],
        },
      ],
    };
  }
}
