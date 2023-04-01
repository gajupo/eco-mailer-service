import { inject, injectable } from 'inversify';
import { TYPES } from '../config/types';
import { SendEmailRequest, SendEmailOptions, SendEmailResponseWithAttachment } from '../interfaces/email.interface';
import { ITemplateService } from '../interfaces/template.service.interface';
import { IEmailProvider } from '../interfaces/email.provider.interface';
import { IEmailService } from '../interfaces/email.interface';
import { ISpacesService } from '../interfaces/spaces.service.interface';

@injectable()
export class EmailService implements IEmailService {
  constructor(
    @inject(TYPES.EmailProvider) private emailProvider: IEmailProvider,
    @inject(TYPES.TemplateService) private templateService: ITemplateService,
    @inject(TYPES.SpacesService) private spacesService: ISpacesService,
    ) {}
  public async sendUserPurchaseNotificationEmail(sendEmailRequest: SendEmailRequest): Promise<void> {
    const html = await this.templateService.render('user_purchase_notification', sendEmailRequest.data);
    const sendEmailOptions: SendEmailOptions = {
        to: sendEmailRequest.to,
        subject: sendEmailRequest.subject,
        text: sendEmailRequest.text,
        html,
    };
    await this.sendEmail(sendEmailOptions);
  }

  public async sendEmail(sendEmailOptions: SendEmailOptions): Promise<void> {
    await this.emailProvider.sendEmail(sendEmailOptions);
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
  /**
   * Sends email with attachments to user completed course notification, the attachments are downloaded from Spaces
   * This notification is sent when a user completes a course and gets a certificate
   * @param SendEmailResponseWithAttachment 
   */
  public async sendUserCompletedCourseNotificationEmail(SendEmailResponseWithAttachment: SendEmailResponseWithAttachment): Promise<void> {
    const html = await this.templateService.render('user_completed_course_notification', SendEmailResponseWithAttachment.data);
    
    // Download all attachments from Spaces concurrently
    const attachmentsPromises = SendEmailResponseWithAttachment.attachmentsUrls.map(async (attachmentInfo) => {
      const filePath = this.spacesService.extractPathFromUrl(attachmentInfo.url);
      // validate if attachmentInfo.filename is undefined, extractFileNameFromPath will return the last part of the path
      const fileName = attachmentInfo.fileName || this.spacesService.extractFileNameFromPath(filePath);

      const attachmentBuffer = await this.spacesService.downloadFile(filePath);
      return {
        filename: fileName,
        content: attachmentBuffer,
      };
    });
    const attachments = await Promise.all(attachmentsPromises);

    const sendEmailOptions: SendEmailOptions = {
        to: SendEmailResponseWithAttachment.to,
        subject: SendEmailResponseWithAttachment.subject,
        text: SendEmailResponseWithAttachment.text,
        html,
        attachments,
    };
    await this.sendEmail(sendEmailOptions);
  }
  /**
   * Sends email to user completed course failed notification, this notification is sent when a user completes a course but does not get a certificate.
   * The user will receive a notification with the reason why he did not get a certificate
   * @param sendEmailRequest 
   */
  public async sendUserCompletedCourseFailedNotificationEmail(sendEmailRequest: SendEmailRequest): Promise<void> {
    const html = await this.templateService.render('user_completed_course_failed_notification', sendEmailRequest.data);
    const sendEmailOptions: SendEmailOptions = {
        to: sendEmailRequest.to,
        subject: sendEmailRequest.subject,
        text: sendEmailRequest.text,
        html,
    };
    await this.sendEmail(sendEmailOptions);
  }

  /**
   * Sends email with attachments to user diploma notification, the attachments are downloaded from Spaces
   * This notification is sent when a user completes a course and gets a diploma
   * @param SendEmailResponseWithAttachment
   * @returns
   */
  public async sendUserDiplomaNotificationEmail(SendEmailResponseWithAttachment: SendEmailResponseWithAttachment): Promise<void> {
    const html = await this.templateService.render('user_diploma_notification', SendEmailResponseWithAttachment.data);

    // Download all attachments from Spaces concurrently
    const attachmentsPromises = SendEmailResponseWithAttachment.attachmentsUrls.map(async (attachmentInfo) => {
      const filePath = this.spacesService.extractPathFromUrl(attachmentInfo.url);
      // validate if attachmentInfo.filename is undefined, extractFileNameFromPath will return the last part of the path
      const fileName = attachmentInfo.fileName || this.spacesService.extractFileNameFromPath(filePath);

      const attachmentBuffer = await this.spacesService.downloadFile(filePath);
      return {
        filename: fileName,
        content: attachmentBuffer,
      };
    });
    const attachments = await Promise.all(attachmentsPromises);

    const sendEmailOptions: SendEmailOptions = {
        to: SendEmailResponseWithAttachment.to,
        subject: SendEmailResponseWithAttachment.subject,
        text: SendEmailResponseWithAttachment.text,
        html,
        attachments,
    };
    await this.sendEmail(sendEmailOptions);
  }
}
