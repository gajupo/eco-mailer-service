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
  sendCourseCompletionEmail(sendEmailRequest: SendEmailRequest): Promise<void>;
  sendNewPurchaseNotificationEmail(sendEmailRequest: SendEmailRequest): Promise<void>;
}
