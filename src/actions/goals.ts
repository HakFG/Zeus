'use server';
import { db } from '@/db';
import { savingsGoals } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { and, desc, eq } from 'drizzle-orm';
import { getPersonalUserId } from '@/lib/personalUser';

export async function addGoal(data: { name: string; targetAmount: string; deadline: string; icon: string; color: string }) {
  const userId = await getPersonalUserId();

  await db.insert(savingsGoals).values({ ...data, userId });
  revalidatePath('/invest');
}

export async function getGoals() {
  const userId = await getPersonalUserId();

  return await db.query.savingsGoals.findMany({
    where: eq(savingsGoals.userId, userId),
    orderBy: [desc(savingsGoals.createdAt)],
  });
}

export async function updateGoalProgress(id: string, savedAmount: string, completed: boolean) {
  const userId = await getPersonalUserId();

  await db.update(savingsGoals)
    .set({ savedAmount, completed })
    .where(and(eq(savingsGoals.id, id), eq(savingsGoals.userId, userId)));
  revalidatePath('/invest');
}

export async function deleteGoal(id: string) {
  const userId = await getPersonalUserId();

  await db.delete(savingsGoals).where(and(eq(savingsGoals.id, id), eq(savingsGoals.userId, userId)));
  revalidatePath('/invest');
}
