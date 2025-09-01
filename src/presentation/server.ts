import { CheckService } from '../domain/use-cases/checks/check.service';
import { CronService } from './cron/cron.service';

export class Server {
  public static start() {
    console.log('Server has started');
    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://google.com';
      new CheckService(
        () => console.log(`Successfully fetched ${url}`),
        error => console.error(`Failed to fetch ${url}: ${error}`)
      ).execute(url);
    });
  }
}
