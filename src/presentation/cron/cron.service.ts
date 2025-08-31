import { CronJob } from 'cron';

type CronTime = string | Date;
type OnType = () => void;

export class CronService {
  public static createJob(cronTime: CronTime, onTick: OnType): CronJob {
    const job = new CronJob(cronTime, onTick);
    job.start();
    return job;
  }
}
