import { pgTable, uuid, text, numeric, boolean, timestamp, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const settings = pgTable('settings', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  allowanceAmount: numeric('allowance_amount').notNull().default('500'),
  allowanceResetDay: integer('allowance_reset_day').notNull().default(1),
  cdiRate: numeric('cdi_rate').notNull().default('0.1375'),
  darkMode: boolean('dark_mode').notNull().default(false),
});

export const expenses = pgTable('expenses', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  amount: numeric('amount').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  date: text('date').notNull(),
  note: text('note'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const income = pgTable('income', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  amount: numeric('amount').notNull(),
  type: text('type').notNull(),
  description: text('description').notNull(),
  date: text('date').notNull(),
  recurring: boolean('recurring').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

export const investments = pgTable('investments', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  label: text('label').notNull(),
  amount: numeric('amount').notNull(),
  date: text('date').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const savingsGoals = pgTable('savings_goals', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  targetAmount: numeric('target_amount').notNull(),
  savedAmount: numeric('saved_amount').notNull().default('0'),
  deadline: text('deadline').notNull(),
  icon: text('icon').notNull(),
  color: text('color').notNull(),
  completed: boolean('completed').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow(),
});
