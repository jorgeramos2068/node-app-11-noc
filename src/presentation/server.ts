import { CheckService } from '@/domain/use-cases/checks/check.service';
import { FileSystemDatasource } from '@/infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '@/infrastructure/repositories/log.repository';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';
import { SendLogsService } from '@/domain/use-cases/email/send-logs.service';

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());
const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server has started');

    // Email
    // new SendLogsService(emailService, fileSystemLogRepository).execute('test@gmail.com');

    // Cron Job Example
    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://google.com';
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`Successfully fetched ${url}`),
    //     error => console.error(`Failed to fetch ${url}: ${error}`)
    //   ).execute(url);
    // });
  }
}
