'use server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { savingsGoals } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { desc, eq } from 'drizzle-orm';

export async function addGoal(data: { name: string; targetAmount: string; deadline: string; icon: string; color: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  await db.insert(savingsGoals).values({ ...data, userId: session.user.id });
  revalidatePath('/invest');
}

export async function getGoals() {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  return await db.query.savingsGoals.findMany({
    where: eq(savingsGoals.userId, session.user.id),
    orderBy: [desc(savingsGoals.createdAt)],
  });
}

export async function updateGoalProgress(id: string, savedAmount: string, completed: boolean) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  await db.update(savingsGoals)
    .set({ savedAmount, completed })
    .where(eq(savingsGoals.id, id));
  revalidatePath('/invest');
}

export async function deleteGoal(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  await db.delete(savingsGoals).where(eq(savingsGoals.id, id));
  revalidatePath('/invest');
}
