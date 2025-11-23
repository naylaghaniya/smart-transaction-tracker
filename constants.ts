import { Category } from './types';

export const SUBCATEGORIES: Record<Category, string[]> = {
  [Category.EXPENSE]: ['Food', 'Transport', 'Utilities', 'Shopping', 'Entertainment', 'Health', 'Housing', 'Other'],
  [Category.INCOME]: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
  [Category.SAVINGS]: ['Deposit', 'Investment Contribution', 'Other'],
};