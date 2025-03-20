import type { Request, Response, NextFunction } from 'express';
import type { IGanpaConfig } from '../types';

// header에 Bearer {token} 형태로 오면 Bearer prefix를 제거해준다.
// 즉, 지정하던 안하던 상관없게 처리한다는 의도.
export const bearerTokenMiddleware = ({
  getLogger,
}: Pick<IGanpaConfig, 'getLogger'>) => {
  const logger = getLogger('bearer-token-middleware.ts');

  logger.debug('Enabling bearer token middleware');

  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // strip 'Bearer ' prefix from token
    if (authHeader) {
      req.headers.authorization = authHeader.replace(/^Bearer\s+/i, '');
    }

    next();
  };
};
