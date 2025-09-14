import nodemailer from 'nodemailer';

import { envs } from '../../config/plugins/env.plugin';
import { LogRepository } from '../../domain/repositories/log.repository';
import { LogEntity } from '../../domain/entities/log.entity';

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

  constructor(private readonly logRepository: LogRepository) {}

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
      const log: LogEntity = {
        level: 'low',
        message: `Email sent: ${info.messageId}`,
        createdAt: new Date(),
        origin: 'EmailService',
      };
      await this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log: LogEntity = {
        level: 'high',
        message: 'Email sent failed',
        createdAt: new Date(),
        origin: 'EmailService',
      };
      await this.logRepository.saveLog(log);
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
