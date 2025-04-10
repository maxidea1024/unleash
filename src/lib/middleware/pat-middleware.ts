import type { IGanpaConfig } from '../types';
import type { IAuthRequest } from '../routes/ganpa-types';
import NotFoundError from '../error/notfound-error';
import type { AccountService } from '../services/account-service';

export default function patMiddleware(
  { getLogger }: Pick<IGanpaConfig, 'getLogger'>,
  { accountService }: { accountService: AccountService },
): any {
  const logger = getLogger('pat-middleware.ts');

  logger.debug('Enabling PAT middleware');

  return async (req: IAuthRequest, res, next) => {
    try {
      const apiToken = req.header('authorization');

      if (apiToken?.startsWith('user:')) {
        const user = await accountService.getAccountByPersonalAccessToken(apiToken);

        req.user = user;

        accountService.addPATSeen(apiToken);
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        logger.warn(
          'Tried to use a PAT token for user that no longer existed',
          error,
        );
      } else {
        logger.error(error);
      }
    }

    next();
  };
}
