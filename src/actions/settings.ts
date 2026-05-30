'use server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { settings, expenses, income, investments, savingsGoals } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

export async function getSettings() {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  const userSettings = await db.query.settings.findFirst({
    where: eq(settings.userId, session.user.id),
  });

  if (!userSettings) {
    // Create default settings if they don't exist
    const [newSettings] = await db.insert(settings).values({
      userId: session.user.id,
    }).returning();
    return newSettings;
  }

  return userSettings;
}

export async function updateSettings(data: { allowanceAmount?: string; allowanceResetDay?: number; cdiRate?: string; darkMode?: boolean }) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  await db.update(settings)
    .set(data)
    .where(eq(settings.userId, session.user.id));
  revalidatePath('/settings');
  revalidatePath('/dashboard');
  revalidatePath('/invest');
}

export async function exportUserData() {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  const userId = session.user.id;
  const userExpenses = await db.query.expenses.findMany({ where: eq(expenses.userId, userId) });
  const userIncome = await db.query.income.findMany({ where: eq(income.userId, userId) });
  const userInvestments = await db.query.investments.findMany({ where: eq(investments.userId, userId) });
  const userGoals = await db.query.savingsGoals.findMany({ where: eq(savingsGoals.userId, userId) });
  const userSettings = await getSettings();

  return {
    settings: userSettings,
    expenses: userExpenses,
    income: userIncome,
    investments: userInvestments,
    goals: userGoals,
  };
}

export async function deleteAllData() {
  const session = await auth();
  if (!session?.user?.id) throw new Error('Não autorizado');

  const userId = session.user.id;
  await db.delete(expenses).where(eq(expenses.userId, userId));
  await db.delete(income).where(eq(income.userId, userId));
  await db.delete(investments).where(eq(investments.userId, userId));
  await db.delete(savingsGoals).where(eq(savingsGoals.userId, userId));
  // Keep settings, or delete them and let them be recreated
  await db.delete(settings).where(eq(settings.userId, userId));
  
  revalidatePath('/dashboard');
  revalidatePath('/calendar');
  revalidatePath('/charts');
  revalidatePath('/invest');
  revalidatePath('/settings');
}
