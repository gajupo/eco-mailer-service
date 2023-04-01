import { interfaces, controller, httpPost, requestBody, httpGet } from 'inversify-express-utils';
import { inject } from 'inversify';
import { TYPES } from '../config/types';
import { SendEmailRequest, IEmailService, SendEmailResponseWithAttachment } from '../interfaces/email.interface';
import { ILogger } from '../interfaces/logger.interface';

@controller('/sendemail')
export class EmailController implements interfaces.Controller {
  constructor(
    @inject(TYPES.EmailService) private emailService: IEmailService,
    @inject(TYPES.Logger) private logger: ILogger,
    ) {}

  @httpPost('/new-purchase-notification')
  public async sendNewPurchaseNotificationEmail(
    @requestBody() sendEmailRequest: SendEmailRequest,
  ): Promise<any> {
    await this.emailService.sendNewPurchaseNotificationEmail(sendEmailRequest);
    this.logger.info(`Email for new purchase notification sent to ${sendEmailRequest.to}`);
    // response a success message in json format
    return { message: 'Email sent successfully' };
  }

  @httpPost('/user-purchase-notification')
  public async sendUserPurchaseNotificationEmail(
    @requestBody() sendEmailRequest: SendEmailRequest,
  ): Promise<any> {
    await this.emailService.sendUserPurchaseNotificationEmail(sendEmailRequest);
    this.logger.info(`Email for user purchase notification sent to ${sendEmailRequest.to}`);
    // response a success message in json format
    return { message: 'Email sent successfully' };
  }

  @httpPost('/user-completed-course-notification')
  public async sendUserCompletedCourseNotificationEmail(
    @requestBody() SendEmailResponseWithAttachment: SendEmailResponseWithAttachment,
  ): Promise<any> {
    await this.emailService.sendUserCompletedCourseNotificationEmail(SendEmailResponseWithAttachment);
    this.logger.info(`Email for user completed course notification sent to ${SendEmailResponseWithAttachment.to}`);
    // response a success message in json format
    return { message: 'Email sent successfully' };
  }

  @httpPost('/user-completed-course-failed-notification')
  public async sendUserCompletedCourseFailedNotificationEmail(
    @requestBody() sendEmailRequest: SendEmailRequest,
  ): Promise<any> {
    await this.emailService.sendUserCompletedCourseFailedNotificationEmail(sendEmailRequest);
    this.logger.info(`Email for user completed course failed notification sent to ${sendEmailRequest.to}`);
    // response a success message in json format
    return { message: 'Email sent successfully' };
  }
}
