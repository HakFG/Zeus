'use server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { expenses } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { desc, eq } from 'drizzle-orm';

export async function addExpense(data: { amount: string; category: string; description: string; date: string; note?: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  await db.insert(expenses).values({ ...data, userId: session.user.id });
  revalidatePath('/dashboard');
  revalidatePath('/calendar');
  revalidatePath('/charts');
}

export async function getExpenses() {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  return await db.query.expenses.findMany({
    where: eq(expenses.userId, session.user.id),
    orderBy: [desc(expenses.date), desc(expenses.createdAt)],
  });
}

export async function deleteExpense(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  await db.delete(expenses).where(eq(expenses.id, id));
  revalidatePath('/dashboard');
  revalidatePath('/calendar');
  revalidatePath('/charts');
}
