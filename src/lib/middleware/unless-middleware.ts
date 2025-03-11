import type { RequestHandler } from 'express';

export const unless =
  (path: string, middleware: RequestHandler): RequestHandler =>
    (req, res, next) => {
      // Use regular expression to compare path
      const pathMatch = new RegExp(`^${path}$`);
      if (pathMatch.test(req.path)) {
        return next();
      } else {
        return middleware(req, res, next);
      }
    };
