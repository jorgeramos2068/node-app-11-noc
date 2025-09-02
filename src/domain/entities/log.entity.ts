export type LogLevel = 'low' | 'medium' | 'high';

export class LogEntity {
  constructor(public level: LogLevel, public message: string, public createdAt: Date = new Date()) {}
}
