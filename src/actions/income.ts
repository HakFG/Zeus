'use server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { income } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { desc, eq } from 'drizzle-orm';

export async function addIncome(data: { amount: string; type: string; description: string; date: string; recurring: boolean }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  await db.insert(income).values({ ...data, userId: session.user.id });
  revalidatePath('/dashboard');
}

export async function getIncome() {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  return await db.query.income.findMany({
    where: eq(income.userId, session.user.id),
    orderBy: [desc(income.date), desc(income.createdAt)],
  });
}

export async function deleteIncome(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  await db.delete(income).where(eq(income.id, id));
  revalidatePath('/dashboard');
}
