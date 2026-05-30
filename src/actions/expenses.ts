'use server';
import { db } from '@/db';
import { expenses } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { and, desc, eq } from 'drizzle-orm';
import { getPersonalUserId } from '@/lib/personalUser';

export async function addExpense(data: { amount: string; category: string; description: string; date: string; note?: string }) {
  const userId = await getPersonalUserId();

  await db.insert(expenses).values({ ...data, userId });
  revalidatePath('/dashboard');
  revalidatePath('/calendar');
  revalidatePath('/charts');
}

export async function getExpenses() {
  const userId = await getPersonalUserId();

  return await db.query.expenses.findMany({
    where: eq(expenses.userId, userId),
    orderBy: [desc(expenses.date), desc(expenses.createdAt)],
  });
}

export async function deleteExpense(id: string) {
  const userId = await getPersonalUserId();

  await db.delete(expenses).where(and(eq(expenses.id, id), eq(expenses.userId, userId)));
  revalidatePath('/dashboard');
  revalidatePath('/calendar');
  revalidatePath('/charts');
}
