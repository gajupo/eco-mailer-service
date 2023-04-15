export interface SendEmailRequest {
  to: string;
  subject: string;
  text: string;
  templateName: string;
  data: object;
}

// the attachment is an array of objects { filename:string, content:base64 string}
export interface SendEmailResponseWithAttachment {
  to: string;
  subject: string;
  text: string;
  templateName: string;
  data: object;
  attachments: Array<{ filename?: string; content: string }>;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments?: Array<{ filename?: string; content: Buffer }>;
}

export interface IEmailProvider {
  sendEmail(sendEmailRequest: SendEmailRequest): Promise<void>;
}

export interface IEmailService {
  sendEmail(sendEmailOptions: SendEmailOptions): Promise<void>;
  sendNewPurchaseNotificationEmail(sendEmailRequest: SendEmailRequest): Promise<void>;
  sendUserPurchaseNotificationEmail(sendEmailRequest: SendEmailRequest): Promise<void>;
  sendUserCompletedCourseNotificationEmail(SendEmailResponseWithAttachment: SendEmailResponseWithAttachment): Promise<void>;
  sendUserCompletedCourseFailedNotificationEmail(sendEmailRequest: SendEmailRequest): Promise<void>;
  sendUserDiplomaNotificationEmail(SendEmailResponseWithAttachment: SendEmailResponseWithAttachment): Promise<void>;
}
