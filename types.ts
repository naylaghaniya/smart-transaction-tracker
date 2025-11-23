export enum Category {
  EXPENSE = 'Expense',
  INCOME = 'Income',
  SAVINGS = 'Savings',
}

export enum TransactionType {
  ONE_TIME = 'One-time',
  RECURRING = 'Recurring',
}

export enum FundSource {
  BANK = 'Bank Account',
  CREDIT_CARD = 'Credit Card',
  CASH = 'Cash',
  OTHER = 'Other',
}

export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  description: string;
  category: Category;
  subcategory: string;
  type: TransactionType;
  amount: string; // Stored as string to handle input, but should be number for calculations
  source: FundSource;
  notes: string;
}

export interface Budget {
  subcategory: string; // Used as a unique identifier for each budget
  budgeted: number;
}
