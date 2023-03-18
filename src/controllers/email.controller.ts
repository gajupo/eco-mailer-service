import { interfaces, controller, httpPost, requestBody } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../config/types';
import { SendEmailRequest, IEmailService } from '../interfaces/email.interface';
import { ILogger } from '../interfaces/logger.interface';

@controller('/sendemail')
export class EmailController implements interfaces.Controller {
  constructor(
    @inject(TYPES.EmailService) private emailService: IEmailService,
    @inject(TYPES.Logger) private logger: ILogger,
    ) {}

  @httpPost('/course-completion')
  public async sendCourseCompletionEmail(
    @requestBody() sendEmailRequest: SendEmailRequest,
  ): Promise<any> {
    await this.emailService.sendCourseCompletionEmail(sendEmailRequest);
    this.logger.info(`Email for course completion sent to ${sendEmailRequest.to}`);
    // response a success message in json format
    return { message: 'Email sent successfully' };
  }

  @httpPost('/new-purchase-notification')
  public async sendNewPurchaseNotificationEmail(
    @requestBody() sendEmailRequest: SendEmailRequest,
  ): Promise<any> {
    await this.emailService.sendNewPurchaseNotificationEmail(sendEmailRequest);
    this.logger.info(`Email for new purchase notification sent to ${sendEmailRequest.to}`);
    // response a success message in json format
    return { message: 'Email sent successfully' };
  }
}
