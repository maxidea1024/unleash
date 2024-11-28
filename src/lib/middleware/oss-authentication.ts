import type { Application } from 'express';
import authorizationMiddleware from './authorization-middleware';
import type { LogProvider } from '../logger';

// config.authentication.type이 IAuthType.OPEN_SOURCE 일때만 동작함.
function ossAuthHook(app: Application, getLogger: LogProvider, baseUriPath: string): void {
  app.use(`${baseUriPath}/api`, authorizationMiddleware(getLogger, baseUriPath, `${baseUriPath}/api`));

  app.use(`${baseUriPath}/logout`, authorizationMiddleware(getLogger, baseUriPath, `${baseUriPath}/logout`));
}

export default ossAuthHook;
