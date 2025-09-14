import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugin';

interface SendEmailOptions {
  to: string;
  subject: string;
  htmlBody: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody } = options;
    try {
      const info = await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html: htmlBody,
      });
      console.log('Email sent: ' + info);
      return true;
    } catch (error) {
      return false;
    }
  }
}
