import { inject, injectable } from 'inversify';
import { TYPES } from '../config/types';
import { SendEmailRequest, SendEmailOptions } from '../interfaces/email.interface';
import { ITemplateService } from '../interfaces/template.service.interface';
import { IEmailProvider } from '../interfaces/email.provider.interface';

@injectable()
export class EmailService {
  constructor(
    @inject(TYPES.EmailProvider) private emailProvider: IEmailProvider,
    @inject(TYPES.TemplateService) private templateService: ITemplateService,
    ) {}

  public async sendEmail(sendEmailOptions: SendEmailOptions): Promise<void> {
    await this.emailProvider.sendEmail(sendEmailOptions);
  }

  public async sendCourseCompletionEmail(sendEmailRequest: SendEmailRequest): Promise<void> {
    const html = await this.templateService.render('course_completion', sendEmailRequest.data);
    const sendEmailOptions: SendEmailOptions = {
        to: sendEmailRequest.to,
        subject: sendEmailRequest.subject,
        text: sendEmailRequest.text,
        html,
    };
    await this.sendEmail(sendEmailOptions);
  }

  public async sendNewPurchaseNotificationEmail(sendEmailRequest: SendEmailRequest): Promise<void> {
    const html = await this.templateService.render('new_purchase_notification', sendEmailRequest.data);
    const sendEmailOptions: SendEmailOptions = {
        to: sendEmailRequest.to,
        subject: sendEmailRequest.subject,
        text: sendEmailRequest.text,
        html,
    };
    await this.sendEmail(sendEmailOptions);
  }
}
