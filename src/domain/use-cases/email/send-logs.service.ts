import { LogRepository } from '@/domain/repositories/log.repository';
import { EmailService } from '@/presentation/email/email.service';

interface SendLogsServiceUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendLogsService implements SendLogsServiceUseCase {
  constructor(private readonly emailService: EmailService, private readonly logRepository: LogRepository) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithLogFiles(to);
      if (!sent) {
        throw new Error('Failed to send email with log files');
      }
      return true;
    } catch (error) {
      this.logRepository.saveLog({
        level: 'high',
        message: error instanceof Error ? error.message : 'Unknown error',
        createdAt: new Date(),
        origin: 'SendLogsService',
      });
      return false;
    }
  }
}
