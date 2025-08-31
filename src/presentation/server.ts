import { CronService } from './cron/cron.service';

export class Server {
  public static start() {
    console.log('Server has started');
    CronService.createJob('*/5 * * * * *', () => {
      console.log('You will see this message every 5 seconds');
    });
  }
}
