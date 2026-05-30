'use server';
import { db } from '@/db';
import { investments } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { and, desc, eq } from 'drizzle-orm';
import { getPersonalUserId } from '@/lib/personalUser';

export async function addInvestment(data: { type: string; label: string; amount: string; date: string }) {
  const userId = await getPersonalUserId();

  await db.insert(investments).values({ ...data, userId });
  revalidatePath('/invest');
}

export async function getInvestments() {
  const userId = await getPersonalUserId();

  return await db.query.investments.findMany({
    where: eq(investments.userId, userId),
    orderBy: [desc(investments.date), desc(investments.createdAt)],
  });
}

export async function deleteInvestment(id: string) {
  const userId = await getPersonalUserId();

  await db.delete(investments).where(and(eq(investments.id, id), eq(investments.userId, userId)));
  revalidatePath('/invest');
}
