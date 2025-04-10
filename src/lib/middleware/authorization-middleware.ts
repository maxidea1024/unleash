import type { IAuthRequest } from '../routes/ganpa-types';
import type { NextFunction, Response } from 'express';
import type { LogProvider } from '../logger';
import { AuthenticationRequired } from '../server-impl';
import UnauthorizedError from '../error/unauthorized-error';

export default function authorizationMiddleware(
  getLogger: LogProvider,
  baseUriPath: string,
  apiEndpoint?: string,
): any {
  const logger = getLogger('authorization-middleware.ts');

  if (apiEndpoint) {
    logger.debug(`Enabling Authorization middleware: ${apiEndpoint}`);
  } else {
    logger.debug(`Enabling Authorization middleware`);
  }

  return async (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (!req.user?.isAPI && req.session?.user) {
      req.user = req.session.user;
      return next();
    }

    if (req.user) {
      return next();
    }

    if (req.header('authorization')) {
      // API clients should get 401 with a basic body
      const error = new UnauthorizedError('You must log in to use Ganpa.');
      return res.status(error.statusCode).json(error);
    }

    const path = `${baseUriPath}/auth/simple/login`;
    const error = new AuthenticationRequired({
      message: `You must log in to use Ganpa. Your request had no authorization header, so we could not authorize you. Try logging in at ${path}`,
      type: 'password',
      path,
    });

    return res.status(error.statusCode).json(error);
  };
}
