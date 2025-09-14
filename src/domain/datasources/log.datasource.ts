import { LogEntity, LogLevel } from '@/domain/entities/log.entity';

export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(level: LogLevel): Promise<LogEntity[]>;
}
