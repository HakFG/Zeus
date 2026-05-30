'use server';
import { db } from '@/db';
import { income } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { and, desc, eq } from 'drizzle-orm';
import { getPersonalUserId } from '@/lib/personalUser';

export async function addIncome(data: { amount: string; type: string; description: string; date: string; recurring: boolean }) {
  const userId = await getPersonalUserId();

  await db.insert(income).values({ ...data, userId });
  revalidatePath('/dashboard');
}

export async function getIncome() {
  const userId = await getPersonalUserId();

  return await db.query.income.findMany({
    where: eq(income.userId, userId),
    orderBy: [desc(income.date), desc(income.createdAt)],
  });
}

export async function deleteIncome(id: string) {
  const userId = await getPersonalUserId();

  await db.delete(income).where(and(eq(income.id, id), eq(income.userId, userId)));
  revalidatePath('/dashboard');
}
