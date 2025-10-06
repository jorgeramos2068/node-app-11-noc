import { envs } from '@/config/plugins/env.plugin';
import { MongoDatabase } from '@/data/mongo';
import { PrismaClient } from '@/generated/prisma';
import { Server } from '@/presentation/server';

(async () => {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  const prisma = new PrismaClient();
  const newLog = await prisma.logModel.create({
    data: {
      level: 'HIGH',
      message: 'Test message',
      origin: 'app.ts',
    },
  });
  console.log('New log created:', newLog);
  await prisma.$disconnect();
  // main();
})();

function main() {
  Server.start();
}
