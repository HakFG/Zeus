'use server';
import { db } from '@/db';
import { settings, expenses, income, investments, savingsGoals } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { getPersonalUserId } from '@/lib/personalUser';

export async function getSettings() {
  const userId = await getPersonalUserId();

  const userSettings = await db.query.settings.findFirst({
    where: eq(settings.userId, userId),
  });

  if (!userSettings) {
    const [newSettings] = await db.insert(settings).values({
      userId,
    }).returning();
    return newSettings;
  }

  return userSettings;
}

export async function updateSettings(data: { allowanceAmount?: string; allowanceResetDay?: number; cdiRate?: string; darkMode?: boolean }) {
  const userId = await getPersonalUserId();

  await db.update(settings)
    .set(data)
    .where(eq(settings.userId, userId));
  revalidatePath('/settings');
  revalidatePath('/dashboard');
  revalidatePath('/invest');
}

export async function exportUserData() {
  const userId = await getPersonalUserId();
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
  const userId = await getPersonalUserId();

  await db.delete(expenses).where(eq(expenses.userId, userId));
  await db.delete(income).where(eq(income.userId, userId));
  await db.delete(investments).where(eq(investments.userId, userId));
  await db.delete(savingsGoals).where(eq(savingsGoals.userId, userId));
  await db.delete(settings).where(eq(settings.userId, userId));

  revalidatePath('/dashboard');
  revalidatePath('/calendar');
  revalidatePath('/charts');
  revalidatePath('/invest');
  revalidatePath('/settings');
}
