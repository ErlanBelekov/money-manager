import { proxy } from 'valtio';

export interface ExpensesState {
  expenses: Expense[];
  totalThisMonth: number;
}

export const expensesState = proxy<ExpensesState>({
  expenses: [],
  totalThisMonth: 0,
});
