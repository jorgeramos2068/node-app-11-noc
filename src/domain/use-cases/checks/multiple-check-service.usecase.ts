import { LogEntity } from '@/domain/entities/log.entity';
import { LogRepository } from '@/domain/repositories/log.repository';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class MultipleCheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private callRepositories(log: LogEntity) {
    this.logRepository.forEach(repo => repo.saveLog(log));
  }

  async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Failed to fetch ${url}`);
      }
      const log = new LogEntity({
        level: 'low',
        message: `Successfully fetched ${url}`,
        origin: 'check.service.ts',
      });
      this.callRepositories(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const log = new LogEntity({
        level: 'high',
        message: errorMessage,
        origin: 'check.service.ts',
      });
      this.callRepositories(log);
      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}
