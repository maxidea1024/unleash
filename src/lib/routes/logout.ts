import type { Response } from 'express';
import { promisify } from 'util';
import { type IGanpaConfig, NONE } from '../types';
import Controller from './controller';
import type { IAuthRequest } from './ganpa-types';
import type { IGanpaServices } from '../types';
import type SessionService from '../services/session-service';

export default class LogoutController extends Controller {
  private readonly clearSiteDataOnLogout: boolean;
  private readonly cookieName: string;
  private readonly baseUri: string;
  private readonly sessionService: SessionService;

  constructor(
    config: IGanpaConfig,
    { sessionService }: Pick<IGanpaServices, 'sessionService'>,
  ) {
    super(config);

    this.sessionService = sessionService;
    this.baseUri = config.server.baseUriPath;
    this.clearSiteDataOnLogout = config.session.clearSiteDataOnLogout;
    this.cookieName = config.session.cookieName;

    this.route({
      method: 'post',
      path: '/',
      handler: this.logout,
      permission: NONE,
      acceptAnyContentType: true,
    });
  }

  async logout(req: IAuthRequest, res: Response): Promise<void> {
    if (req.session) {
      // Allow SSO to register custom logout logic.
      if (req.session.logoutUrl) {
        res.redirect(req.session.logoutUrl);
        return;
      }
    }

    if (req.logout) {
      if (this.isReqLogoutWithoutCallback(req.logout)) {
        // passport < 0.6.0
        req.logout();
      } else {
        // for passport >= 0.6.0, a callback function is expected as first argument.
        // to reuse controller error handling, function is turned into a promise
        const logoutAsyncFn = promisify(req.logout).bind(req);
        await logoutAsyncFn();
      }
    }

    if (req.session) {
      if (req.session.user?.id) {
        await this.sessionService.deleteSessionsForUser(req.session.user.id);
      }
      req.session.destroy();
    }

    res.clearCookie(this.cookieName);

    if (this.clearSiteDataOnLogout) {
      res.set('Clear-Site-Data', '"cookies", "storage"');
    }

    if (req.user?.id) {
      await this.sessionService.deleteSessionsForUser(req.user.id);
    }

    res.redirect(`${this.baseUri}/`);
  }

  private isReqLogoutWithoutCallback(
    logout: IAuthRequest['logout'],
  ): logout is () => void {
    return logout.length === 0;
  }
}
