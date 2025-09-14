import { CheckService } from '../domain/use-cases/checks/check.service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

export class Server {
  public static start() {
    console.log('Server has started');
    const emailService = new EmailService();
    emailService.sendEmail({
      to: 'something@gmail.com',
      subject: 'Test Email',
      htmlBody: '<h1>Hello World</h1>',
    });
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
