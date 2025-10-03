export type LogLevel = 'low' | 'medium' | 'high';

export interface LogEntityOptions {
  level: LogLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    this.level = options.level;
    this.message = options.message;
    this.createdAt = options.createdAt ?? new Date();
    this.origin = options.origin;
  }

  public static fromObject(object: { [key: string]: any }): LogEntity {
    const { level, message, createdAt, origin } = object;
    return new LogEntity({
      level,
      message,
      createdAt: createdAt ?? new Date(),
      origin,
    });
  }
}
