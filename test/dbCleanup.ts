import {
  getDBConnection,
  closeDBConnection,
} from '../src/models';

export async function dbCleanup(): Promise<void> {
  const db = getDBConnection();
  await db.collections['tasks'].drop();
  closeDBConnection();
}