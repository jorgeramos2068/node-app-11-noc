import nodemailer from 'nodemailer';

import { envs } from '@/config/plugins/env.plugin';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachments[];
}

interface Attachments {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor() {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;
    try {
      const info = await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to,
        subject,
        html: htmlBody,
        attachments,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendEmailWithLogFiles(to: string | string[]): Promise<boolean> {
    const subject = 'Log Files';
    const htmlBody = '<h1>Attached are the log files.</h1>';
    const attachments: Attachments[] = [
      { filename: 'all.log', path: './logs/all.log' },
      { filename: 'high.log', path: './logs/high.log' },
      { filename: 'medium.log', path: './logs/medium.log' },
    ];
    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
