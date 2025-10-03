import { LogModel } from '@/data/mongo';
import { LogDatasource } from '@/domain/datasources/log.datasource';
import { LogEntity, LogLevel } from '@/domain/entities/log.entity';

export class MongoDataSource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
    console.log('Mongo log saved:', newLog);
  }

  async getLogs(level: LogLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level });
    return logs.map(log => LogEntity.fromObject(log.toObject()));
  }
}
