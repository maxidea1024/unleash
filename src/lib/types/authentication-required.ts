import { type ApiErrorSchema, GanpaError } from '../error/ganpa-error';

interface IBaseOptions {
  type: string;
  path: string;
  message: string;
  defaultHidden?: boolean;
}

interface IOptions extends IBaseOptions {
  options?: IBaseOptions[];
}

export default class AuthenticationRequired extends GanpaError {
  statusCode = 401;

  private readonly type: string;
  private readonly path: string;
  private readonly defaultHidden: boolean;
  private readonly options?: IBaseOptions[];

  constructor({
    type,
    path,
    message,
    options,
    defaultHidden = false,
  }: IOptions) {
    super(message);

    this.type = type;
    this.path = path;
    this.options = options;
    this.defaultHidden = defaultHidden;
  }

  toJSON(): ApiErrorSchema {
    return {
      ...super.toJSON(),
      path: this.path,
      type: this.type,
      defaultHidden: this.defaultHidden,
      ...(this.options ? { options: this.options } : {}),
    };
  }
}
