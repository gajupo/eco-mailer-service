import { injectable } from 'inversify';
import * as nodemailer from 'nodemailer';
import { SendEmailOptions } from '../../interfaces/email.interface';
import { mailerConfig } from '../../config/mailer.config';
import { IEmailProvider } from '../../interfaces/email.provider.interface';

@injectable()
export class NodeMailerService implements IEmailProvider {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(mailerConfig.nodemailer);
  }

  public async sendEmail(sendEmailOptions: SendEmailOptions): Promise<void> {
    const mailOptions = {
      from: mailerConfig.nodemailer.senderEmail,
      to: sendEmailOptions.to,
      subject: sendEmailOptions.subject,
      text: sendEmailOptions.text,
      html: sendEmailOptions.html,
      attachments: sendEmailOptions.attachments,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
