
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { apiKeyTable } from './schema';

  
const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const user: typeof apiKeyTable.$inferInsert = {
    token: 'fjksdfkefeoefdefdfsdfkf',
  };

  await db.insert(apiKeyTable).values(user);
  console.log('New user created!')

  const users = await db.select().from(apiKeyTable);
  console.log('Getting all users from the database: ', users)

}

main();
