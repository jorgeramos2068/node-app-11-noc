import { LogDatasource } from '@/domain/datasources/log.datasource';
import { LogEntity, LogLevel } from '@/domain/entities/log.entity';
import { PrismaClient, SeverityLevel } from '@/generated/prisma';

const prisma = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresDataSource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level.toLowerCase() as keyof typeof severityEnum] || SeverityLevel.LOW;
    const newLog = await prisma.logModel.create({
      data: {
        ...log,
        level,
      },
    });
    console.log('PostgreSQL log saved:', newLog);
  }

  async getLogs(level: LogLevel): Promise<LogEntity[]> {
    const postgresLevel = severityEnum[level.toLowerCase() as keyof typeof severityEnum] || SeverityLevel.LOW;
    const logs = await prisma.logModel.findMany({ where: { level: postgresLevel } });
    return logs.map(log => LogEntity.fromObject(log));
  }
}

/*
({
    data: {
      level: 'HIGH',
      message: 'Test message',
      origin: 'app.ts',
    },
  });
  console.log('New log created:', newLog);
  await prisma.$disconnect();*/
