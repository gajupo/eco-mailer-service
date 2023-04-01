import { Container } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import { TYPES } from './types';
import { EmailController } from '../controllers/email.controller';
import { IEmailService } from '../interfaces/email.interface';
import { EmailService } from '../services/email.service';
import { ILogger } from '../interfaces/logger.interface';
import { WinstonLogger } from '../services/logger/winston.logger';
import { IErrorMiddleware } from '../interfaces/middleware.interface';
import { ErrorMiddleware } from '../middlewares/error.middleware';
import { ITemplateService } from '../interfaces/template.service.interface';
import { TemplateServiceImpl } from '../services/template.service';
import { IEmailProvider } from '../interfaces/email.provider.interface';
import { NodeMailerService } from '../services/email-providers/nodemailer.service';
import { MailChimpService } from '../services/email-providers/mailchimp.service';
import { ISpacesService } from '../interfaces/spaces.service.interface';
import { SpacesService } from '../services/spaces.service';

export const container = new Container();

container.bind<interfaces.Controller>(TYPES.EmailController).to(EmailController).whenTargetNamed('EmailController');
container.bind<IEmailService>(TYPES.EmailService).to(EmailService);
container.bind<ILogger>(TYPES.Logger).to(WinstonLogger);
container.bind<IErrorMiddleware>(TYPES.ErrorMiddleware).to(ErrorMiddleware);
container.bind<ITemplateService>(TYPES.TemplateService).to(TemplateServiceImpl);
container.bind<ISpacesService>(TYPES.SpacesService).to(SpacesService);

// Choose the email provider: NodeMailerService or MailChimpService based on the environment variable EMAIL_PROVIDER
const emailProvider = process.env.EMAIL_PROVIDER || 'nodemailer';

if (emailProvider === 'mailchimp') {
  container.bind<IEmailProvider>(TYPES.EmailProvider).to(MailChimpService);
} else {
  container.bind<IEmailProvider>(TYPES.EmailProvider).to(NodeMailerService);
}
