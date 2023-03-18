import { SendEmailOptions } from './email.interface';

export interface IEmailProvider {
    sendEmail(sendEmailOptions: SendEmailOptions): Promise<void>;
}