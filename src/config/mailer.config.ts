import * as dotenv from 'dotenv';

dotenv.config();

const mailerConfig = {
  nodemailer: {
    host: process.env.NODEMAILER_HOST || 'smtp.example.com',
    port: parseInt(process.env.NODEMAILER_PORT || '587'),
    secure: process.env.NODEMAILER_SECURE === 'true',
    auth: {
      user: process.env.NODEMAILER_USER || 'your-email@example.com',
      pass: process.env.NODEMAILER_PASS || 'your-email-password',
    },
    senderEmail: process.env.NODEMAILER_SENDER_EMAIL || 'from-email@example.com',
  },
  mailchimp: {
    apiKey: process.env.MAILCHIMP_API_KEY || 'your-mailchimp-api-key',
    senderEmail: process.env.MAILCHIMP_SENDER_EMAIL ||  'from-email@example.com',
    senderName: process.env.MAILCHIMP_SENDER_NAME || 'from-name',
  },
};

export { mailerConfig };
