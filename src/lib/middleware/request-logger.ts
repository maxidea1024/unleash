import url from 'url';
import type { RequestHandler } from 'express';
import type { IUnleashConfig } from '../types/options';

const requestLogger: (config: IUnleashConfig) => RequestHandler = (config) => {
  const logger = config.getLogger('HTTP');
  const enable = config.server.enableRequestLogger;
  return (req, res, next) => {
    if (enable) {
      res.on('finish', () => {
        try {
          // new URL() 으로 처리하면 '/health' 같은 값이 넘겨졌을때 `Invalid URL` 예외가 발생함.
          // 반면, url.parse() 를 사용하면 문제는 없으나, deprecated로 표시됨.
          // const { pathname } = new URL(req.originalUrl);

          const { pathname } = url.parse(req.originalUrl);

          logger.info(`[${res.statusCode}] [${req.method}] ${pathname}`);
        } catch (err) {
          logger.error('cannot parse url', {
            error: err.message,
            url: req.originalUrl,
          })
        }
      });
    }

    next();
  };
};

export default requestLogger;
