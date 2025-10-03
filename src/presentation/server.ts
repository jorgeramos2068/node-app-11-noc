import { CheckService } from '@/domain/use-cases/checks/check.service';
import { FileSystemDatasource } from '@/infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '@/infrastructure/repositories/log.repository';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';
import { SendLogsService } from '@/domain/use-cases/email/send-logs.service';
import { MongoDataSource } from '@/infrastructure/datasources/mongo.datasource';

const logRepository = new LogRepositoryImpl(
  //new FileSystemDatasource(),
  new MongoDataSource()
);

export class Server {
  public static start() {
    console.log('Server has started');

    // Cron Job
    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com';
      new CheckService(
        logRepository,
        () => console.log(`Successfully fetched ${url}`),
        error => console.error(`Failed to fetch ${url}: ${error}`)
      ).execute(url);
    });
  }
}
