import { db } from '@/db';
import { users } from '@/db/schema';
import { asc } from 'drizzle-orm';

export const PERSONAL_USER_ID = '00000000-0000-4000-8000-000000000001';

export async function getPersonalUserId() {
  const existingUser = await db.query.users.findFirst({
    orderBy: [asc(users.createdAt)],
  });

  if (existingUser) {
    return existingUser.id;
  }

  await db
    .insert(users)
    .values({
      id: PERSONAL_USER_ID,
      email: 'zeus@local.app',
      name: 'Zeus',
    })
    .onConflictDoNothing();

  return PERSONAL_USER_ID;
}
