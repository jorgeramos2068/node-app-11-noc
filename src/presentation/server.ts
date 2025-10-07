import { CheckService } from '@/domain/use-cases/checks/check-service.usecase';
import { SendLogsService } from '@/domain/use-cases/email/send-logs.usecase';
import { MultipleCheckService } from '@/domain/use-cases/checks/multiple-check-service.usecase';
import { FileSystemDatasource } from '@/infrastructure/datasources/file-system.datasource';
import { MongoDataSource } from '@/infrastructure/datasources/mongo.datasource';
import { PostgresDataSource } from '@/infrastructure/datasources/postgres.datasource';
import { LogRepositoryImpl } from '@/infrastructure/repositories/log.repository';
import { CronService } from './cron/cron.service';
import { EmailService } from './email/email.service';

const fsRepository = new LogRepositoryImpl(new FileSystemDatasource());

const mongoRepository = new LogRepositoryImpl(new MongoDataSource());

const postgresRepository = new LogRepositoryImpl(new PostgresDataSource());

export class Server {
  public static start() {
    console.log('Server has started');

    // Cron Job
    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com';
      new MultipleCheckService(
        [fsRepository, mongoRepository, postgresRepository],
        () => console.log(`Successfully fetched ${url}`),
        error => console.error(`Failed to fetch ${url}: ${error}`)
      ).execute(url);
    });
  }
}
