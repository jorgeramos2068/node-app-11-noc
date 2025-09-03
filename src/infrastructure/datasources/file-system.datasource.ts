import * as fs from 'fs';

import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogLevel } from '../../domain/entities/log.entity';

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = 'logs/';
  private readonly allLogsPath = 'logs/all.log';
  private readonly mediumLogsPath = 'logs/medium.log';
  private readonly highLogsPath = 'logs/high.log';

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }
    this.createLogFile(this.allLogsPath);
    this.createLogFile(this.mediumLogsPath);
    this.createLogFile(this.highLogsPath);
  }

  private createLogFile(fileName: string) {
    if (!fs.existsSync(fileName)) {
      fs.writeFileSync(fileName, '');
    }
  }

  async saveLog(newLog: LogEntity): Promise<void> {
    const content: string = `${JSON.stringify(newLog)}\n`;
    fs.appendFileSync(this.allLogsPath, content);
    if (newLog.level === 'medium') {
      fs.appendFileSync(this.mediumLogsPath, content);
    } else if (newLog.level === 'high') {
      fs.appendFileSync(this.highLogsPath, content);
    }
  }

  async getLogs(level: LogLevel): Promise<LogEntity[]> {
    throw new Error('Method not implemented.');
  }
}
