'use server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { investments } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { desc, eq } from 'drizzle-orm';

export async function addInvestment(data: { type: string; label: string; amount: string; date: string }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  await db.insert(investments).values({ ...data, userId: session.user.id });
  revalidatePath('/invest');
}

export async function getInvestments() {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  return await db.query.investments.findMany({
    where: eq(investments.userId, session.user.id),
    orderBy: [desc(investments.date), desc(investments.createdAt)],
  });
}

export async function deleteInvestment(id: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  await db.delete(investments).where(eq(investments.id, id));
  revalidatePath('/invest');
}
