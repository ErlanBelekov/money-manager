export interface Identifiable {
  readonly id: string;
}

export interface Expense extends Identifiable {
  readonly name: string;
  readonly createdAt: Date;
  readonly amount: number;
  readonly category: ExpenseCategory;
}

export type ExpenseCategoryKey =
  | 'FUN'
  | 'HOUSE'
  | 'FOOD'
  | 'SELF_DEVELOPMENT'
  | 'TRANSPORTATION'
  | 'OTHER';

export enum ExpenseCategory {
  FUN = 'FUN',
  HOUSE = 'HOUSE',
  FOOD = 'FOOD',
  SELF_DEVELOPMENT = 'SELF_DEVELOPMENT',
  TRANSPORTATION = 'TRANSPORTATION',
  OTHER = 'OTHER',
}

export interface Theme {
  dark: boolean;
  colors: {
    [ThemeColor: string]: string;
  };
}

export type ThemeColor =
  | 'primary'
  | 'background'
  | 'card'
  | 'text'
  | 'border'
  | 'notification'
  | 'textPrimary'
  | 'textSecondary'
  | 'error'
  | 'grey'
  | 'white'
  | 'black'
  | 'yellow'
  | 'pink'
  | 'accent'
  | 'backgroundSecondary';
