import { proxy } from 'valtio';

import { Expense } from '../types';

export interface ExpensesState {
  expenses: Expense[];
  totalThisMonth: number;
}

export const expensesState = proxy<ExpensesState>({
  expenses: [],
  totalThisMonth: 0,
});
