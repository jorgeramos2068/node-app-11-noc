import { envs } from '@/config/plugins/env.plugin';
import { LogModel, MongoDatabase } from '@/data/mongo';
import { Server } from '@/presentation/server';

(async () => {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  const newLog = await LogModel.create({
    level: 'high',
    message: 'This is a test log message',
    origin: 'app.ts',
  });
  await newLog.save();
  console.log('New Log Created:', newLog);
  // main();
})();

function main() {
  Server.start();
}
