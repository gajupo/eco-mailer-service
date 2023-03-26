export interface SendEmailRequest {
  to: string;
  subject: string;
  text: string;
  templateName: string;
  data: object;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export interface IEmailProvider {
  sendEmail(sendEmailRequest: SendEmailRequest): Promise<void>;
}

export interface IEmailService {
  sendEmail(sendEmailOptions: SendEmailOptions): Promise<void>;
  sendNewPurchaseNotificationEmail(sendEmailRequest: SendEmailRequest): Promise<void>;
  sendUserPurchaseNotificationEmail(sendEmailRequest: SendEmailRequest): Promise<void>;
  sendUserCompletedCourseNotificationEmail(sendEmailRequest: SendEmailRequest): Promise<void>;
  sendUserCompletedCourseFailedNotificationEmail(sendEmailRequest: SendEmailRequest): Promise<void>;
}
