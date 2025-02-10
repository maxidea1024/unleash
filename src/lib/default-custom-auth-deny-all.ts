import type { Express } from 'express';
import type { IUnleashConfig } from './types/options';

const customAuthWarning =
  'You have to configure a custom authentication middleware. Read https://docs.getunleash.io/docs/reference/deploy/configuring-unleash for more details';

export function defaultCustomAuthDenyAll(
  app: Express,
  config: IUnleashConfig,
): void {
  const logger = config.getLogger('default-custom-auth-deny-all.ts');

  app.use(`${config.server.baseUriPath}/api`, async (req, res) => {
    // TODO error ?
    logger.error(customAuthWarning);

    // 401 Unauthorized
    res.status(401).send({
      error: customAuthWarning,
    });
  });
}
