import express, { type Application, type RequestHandler } from 'express';
import compression from 'compression';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import path from 'path';
import errorHandler from 'errorhandler';
import { responseTimeMetrics } from './middleware/response-time-metrics';
import { corsOriginMiddleware } from './middleware/cors-origin-middleware';
import rbacMiddleware from './middleware/rbac-middleware';
import apiTokenMiddleware from './middleware/api-token-middleware';
import type { IGanpaServices } from './types/services';
import { AuthType, type IGanpaConfig } from './types/options';
import type { IGanpaStores } from './types';
import IndexRouter from './routes';
import requestLogger from './middleware/request-logger';
import demoAuthentication from './middleware/demo-authentication';
import ossAuthentication from './middleware/oss-authentication';
import noAuthentication, { noApiToken } from './middleware/no-authentication';
import secureHeaders from './middleware/secure-headers';
import { loadIndexHTML } from './util/load-index-html';
import { findPublicFolder } from './util/findPublicFolder';
import patMiddleware from './middleware/pat-middleware';
import type { Knex } from 'knex';
import maintenanceMiddleware from './features/maintenance/maintenance-middleware';
import { unless } from './middleware/unless-middleware';
import { catchAllErrorHandler } from './middleware/catch-all-error-handler';
import NotFoundError from './error/notfound-error';
import { bearerTokenMiddleware } from './middleware/bearer-token-middleware';
import { auditAccessMiddleware } from './middleware';
import { originMiddleware } from './middleware/origin-middleware';

export default async function getApp(
  config: IGanpaConfig,
  stores: IGanpaStores,
  services: IGanpaServices,
  unleashSession?: RequestHandler,
  db?: Knex,
): Promise<Application> {
  const logger = config.getLogger('app.ts');

  const app = express();

  const baseUriPath = config.server.baseUriPath || '';
  const publicFolder = config.publicFolder || findPublicFolder();
  const indexHTML = await loadIndexHTML(config, publicFolder);

  app.set('trust proxy', true);
  app.disable('x-powered-by');
  app.set('port', config.server.port);
  app.locals.baseUriPath = baseUriPath;

  if (config.server.serverMetrics && config.eventBus) {
    app.use(
      responseTimeMetrics(
        config.eventBus,
        config.flagResolver,
        services.instanceStatsService,
      ),
    );
  }

  app.use(requestLogger(config));

  // We only need bearer token compatibility on /api paths.
  app.use(`${baseUriPath}/api`, bearerTokenMiddleware(config));

  if (typeof config.preHook === 'function') {
    config.preHook(app, config, services, db);
  }

  if (!config.server.disableCompression) {
    app.use(compression());
  }

  app.use(cookieParser());

  app.use((req, res, next) => {
    req.url = req.url.replace(/\/+/g, '/');
    next();
  });

  app.use(
    `${baseUriPath}/api/admin/features-batch`,
    express.json({ strict: false, limit: '500kB' }),
  );

  app.use(
    unless(
      `${baseUriPath}/api/admin/features-batch`,
      express.json({ strict: false }),
    ),
  );

  if (unleashSession) {
    app.use(unleashSession);
  }

  app.use(secureHeaders(config));
  app.use(express.urlencoded({ extended: true }));
  app.use(favicon(path.join(publicFolder, 'favicon.ico')));
  app.use(baseUriPath, favicon(path.join(publicFolder, 'favicon.ico')));
  app.use(baseUriPath, express.static(publicFolder, { index: false }));

  if (config.enableOAS) {
    app.use(`${baseUriPath}/oas`, express.static('docs/api/oas'));
  }

  if (config.enableOAS && services.openApiService) {
    services.openApiService.useDocs(app);
  }

  // Support CORS preflight requests for the frontend endpoints.
  // Preflight requests should not have Authorization headers,
  // so this must be handled before the API token middleware.
  app.options(
    `${baseUriPath}/api/frontend*`,
    corsOriginMiddleware(services, config),
  );

  app.use(baseUriPath, patMiddleware(config, services));

  switch (config.authentication.type) {
    case AuthType.OPEN_SOURCE: {
      app.use(baseUriPath, apiTokenMiddleware(config, services));
      ossAuthentication(app, config.getLogger, config.server.baseUriPath);
      break;
    }
    case AuthType.ENTERPRISE: {
      app.use(baseUriPath, apiTokenMiddleware(config, services));
      if (config.authentication.customAuthHandler) {
        config.authentication.customAuthHandler(app, config, services);
      }
      break;
    }
    case AuthType.HOSTED: {
      app.use(baseUriPath, apiTokenMiddleware(config, services));
      if (config.authentication.customAuthHandler) {
        config.authentication.customAuthHandler(app, config, services);
      }
      break;
    }
    case AuthType.DEMO: {
      app.use(baseUriPath, apiTokenMiddleware(config, services));
      demoAuthentication(app, config.server.baseUriPath, services, config);
      break;
    }
    case AuthType.CUSTOM: {
      app.use(baseUriPath, apiTokenMiddleware(config, services));
      if (config.authentication.customAuthHandler) {
        config.authentication.customAuthHandler(app, config, services);
      }
      break;
    }
    case AuthType.NONE: {
      logger.warn(
        'The AuthType=none option for Unleash is no longer recommended and will be removed in version 6.',
      );
      noApiToken(baseUriPath, app);
      app.use(baseUriPath, apiTokenMiddleware(config, services));
      noAuthentication(baseUriPath, app);
      break;
    }
    default: {
      app.use(baseUriPath, apiTokenMiddleware(config, services));
      demoAuthentication(app, config.server.baseUriPath, services, config);
      break;
    }
  }

  app.use(baseUriPath, rbacMiddleware(config, stores, services.accessService));

  app.use(`${baseUriPath}/api/admin`, originMiddleware(config));

  app.use(`${baseUriPath}/api/admin`, auditAccessMiddleware(config));
  app.use(
    `${baseUriPath}/api/admin`,
    maintenanceMiddleware(config, services.maintenanceService),
  );

  if (typeof config.preRouterHook === 'function') {
    config.preRouterHook(app, config, services, stores, db);
  }

  // Setup API routes
  app.use(`${baseUriPath}/`, new IndexRouter(config, services, db!).router);

  if (services.openApiService) {
    services.openApiService.useErrorHandler(app);
  }

  if (process.env.NODE_ENV !== 'production') {
    app.use(errorHandler());
  } else {
    app.use(catchAllErrorHandler(config.getLogger));
  }

  app.get(`${baseUriPath}`, (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(indexHTML);
  });

  // handle all API 404s
  app.use(`${baseUriPath}/api`, (req, res) => {
    const error = new NotFoundError(
      `The path you were looking for (${baseUriPath}/api${req.path}) is not available.`,
    );
    res.status(error.statusCode).send(error);
  });

  app.get(`${baseUriPath}/*`, (req, res) => {
    res.set('Content-Type', 'text/html');
    const requestPath = path.parse(req.url);
    // appropriately return 404 requests for assets with an extension (js, css, etc)
    if (requestPath.ext !== '' && requestPath.ext !== 'html') {
      res.set('Cache-Control', 'no-cache');
      res.status(404).send(indexHTML);
      return;
    }
    res.send(indexHTML);
  });

  return app;
}
