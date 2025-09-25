import { envs } from '@/config/plugins/env.plugin';
import { MongoDatabase } from '@/data/mongo';
import { Server } from '@/presentation/server';

(async () => {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });
  // main();
})();

function main() {
  Server.start();
}
