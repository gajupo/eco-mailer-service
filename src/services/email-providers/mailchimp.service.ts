import { injectable } from 'inversify';
import Mailchimp from 'mailchimp-api-v3';
import crypto from 'crypto';
import { SendEmailOptions } from '../../interfaces/email.interface';
import { mailerConfig } from '../../config/mailer.config';
import { IEmailProvider } from '../../interfaces/email.provider.interface';

@injectable()
export class MailChimpService implements IEmailProvider {
  private mailchimp: Mailchimp;

  constructor() {
    this.mailchimp = new Mailchimp(mailerConfig.mailchimp.apiKey);
  }

  public async sendEmail(sendEmailOptions: SendEmailOptions): Promise<void> {
    // Replace with your Mailchimp audience ID
    const audienceId = 'YOUR_AUDIENCE_ID';

    const subscriberHash = this.computeSubscriberHash(sendEmailOptions.to);

    // Check if the recipient is already a subscriber
    try {
      await this.mailchimp.get({
        path: `/lists/${audienceId}/members/${subscriberHash}`,
      });
    } catch (error) {
      if (error.status === 404) {
        // Add the recipient as a subscriber if they don't exist
        await this.mailchimp.post({
          path: `/lists/${audienceId}/members`,
          body: {
            email_address: sendEmailOptions.to,
            status: 'subscribed',
          },
        });
      } else {
        throw error;
      }
    }

    // Replace with your Mailchimp template ID
    const templateId = 'YOUR_TEMPLATE_ID';

    // Send the email campaign
    const campaign = await this.mailchimp.post({
      path: '/campaigns',
      body: {
        type: 'regular',
        recipients: {
          list_id: audienceId,
          segment_opts: {
            saved_segment_id: null,
            prebuilt_segment_id: null,
            match: 'any',
            conditions: [
              {
                condition_type: 'EmailAddress',
                field: 'email_address',
                op: 'is',
                value: sendEmailOptions.to,
              },
            ],
          },
        },
        settings: {
          subject_line: sendEmailOptions.subject,
          from_name: mailerConfig.mailchimp.senderName,
          reply_to: mailerConfig.mailchimp.senderEmail,
          template_id: templateId,
        },
      },
    });

    await this.mailchimp.post({
      path: `/campaigns/${campaign.id}/actions/send`,
    });
  }

  private computeSubscriberHash(email: string): string {
    return crypto
      .createHash('md5')
      .update(email.toLowerCase())
      .digest('hex');
  }
}
