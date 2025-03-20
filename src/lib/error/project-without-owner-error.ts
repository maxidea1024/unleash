import { type ApiErrorSchema, GanpaError } from './ganpa-error';

export default class ProjectWithoutOwnerError extends GanpaError {
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
