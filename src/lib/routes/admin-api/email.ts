import { ADMIN } from '../../types/permissions';
import {
  type EmailService,
  TemplateFormat,
} from '../../services/email-service';
import type { IGanpaConfig } from '../../types/options';
import type { IGanpaServices } from '../../types/services';
import type { Request, Response } from 'express';
import Controller from '../controller';
import type { Logger } from '../../logger';
import sanitize from 'sanitize-filename';

export default class EmailController extends Controller {
  private readonly emailService: EmailService;
  private readonly logger: Logger;

  constructor(
    config: IGanpaConfig,
    { emailService }: Pick<IGanpaServices, 'emailService'>,
  ) {
    super(config);

    this.logger = config.getLogger('email.ts');

    this.emailService = emailService;

    this.get('/preview/html/:template', this.getHtmlPreview, ADMIN);
    this.get('/preview/text/:template', this.getTextPreview, ADMIN);
  }

  async getHtmlPreview(req: Request, res: Response): Promise<void> {
    const { template } = req.params;
    const ctx = req.query;
    const data = await this.emailService.compileTemplate(
      sanitize(template),
      TemplateFormat.HTML,
      ctx,
    );
    res.setHeader('Content-Type', 'text/html');
    res.status(200);
    res.send(data);
    res.end();
  }

  async getTextPreview(req: Request, res: Response): Promise<void> {
    const { template } = req.params;
    const ctx = req.query;
    const data = await this.emailService.compileTemplate(
      sanitize(template),
      TemplateFormat.PLAIN,
      ctx,
    );
    res.setHeader('Content-Type', 'text/plain');
    res.status(200);
    res.send(data);
    res.end();
  }
}
