// NOTE: error type name을 임의로 변경하면 아래 로직들이 망가진다. 이름을 변경할 경우에는 문제가 없도록 꼼꼼히 챙겨줘야한다.

import { fromJoiError } from './bad-data-error';
import { ValidationError as JoiValidationError } from 'joi';
import {
  GenericGanpaError,
  type GanpaApiErrorName,
  GanpaApiErrorTypes,
  GanpaError,
} from './ganpa-error';

const getStatusCode = (errorName: string): number => {
  switch (errorName) {
    case 'ContentTypeError':
      return 415;
    case 'ValidationError':
      return 400;
    case 'BadDataError':
      return 400;
    case 'OwaspValidationError':
      return 400;
    case 'PasswordUndefinedError':
      return 400;
    case 'MinimumOneEnvironmentError':
      return 400;
    case 'InvalidTokenError':
      return 401;
    case 'UsedTokenError':
      return 403;
    case 'InvalidOperationError':
      return 403;
    case 'IncompatibleProjectError':
      return 403;
    case 'OperationDeniedError':
      return 403;
    case 'NotFoundError':
      return 404;
    case 'NameExistsError':
      return 409;
    case 'FeatureHasTagError':
      return 409;
    case 'RoleInUseError':
      return 400;
    case 'ProjectWithoutOwnerError':
      return 409;
    case 'UnknownError':
      return 500;
    case 'InternalError':
      return 500;
    case 'PasswordMismatch':
      return 401;
    case 'UnauthorizedError':
      return 401;
    case 'DisabledError':
      return 422;
    case 'NotImplementedError':
      return 405;
    case 'NoAccessError':
      return 403;
    case 'AuthenticationRequired':
      return 401;
    case 'ForbiddenError':
      return 403;
    case 'PermissionError':
      return 403;
    case 'BadRequestError': //thrown by express; do not remove
      return 400;
    default:
      return 500;
  }
};

export const fromLegacyError = (e: Error): GanpaError => {
  if (e instanceof GanpaError) {
    return e;
  }

  const name = GanpaApiErrorTypes.includes(e.name as GanpaApiErrorName)
    ? (e.name as GanpaApiErrorName)
    : 'UnknownError';

  const statusCode = getStatusCode(name);

  if (name === 'NoAccessError') {
    return new GenericGanpaError({
      name: 'NoAccessError',
      message: e.message,
      statusCode,
    });
  }

  if (e instanceof JoiValidationError) {
    return fromJoiError(e);
  }

  if (name === 'ValidationError' || name === 'BadDataError') {
    return new GenericGanpaError({
      name: 'BadDataError',
      message: e.message,
      statusCode,
    });
  }

  if (name === 'OwaspValidationError') {
    return new GenericGanpaError({
      name: 'OwaspValidationError',
      message: e.message,
      statusCode,
    });
  }

  if (name === 'AuthenticationRequired') {
    return new GenericGanpaError({
      name: 'AuthenticationRequired',
      message: `You must be authenticated to view this content. Please log in.`,
      statusCode,
    });
  }

  return new GenericGanpaError({
    name: name as GanpaApiErrorName,
    message: e.message,
    statusCode,
  });
};
