import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

import { StorageKeys } from '../constants';
import { expensesState } from '../states';

interface SpendingsBrainAPI {
  getSpendings(): Promise<Array<Expense>>;
}

const computeExpensesTotal = (data: Expense[]): number => {
  let total = 0;

  data.forEach((e) => {
    total += e.amount;
  });

  return total;
};

export class SpendingsBrain implements SpendingsBrainAPI {
  static shared = new SpendingsBrain();

  async getSpendings(
    shouldPopulateState: boolean = true,
    inThisMonth: boolean = false
  ): Promise<Expense[]> {
    let data: Array<Expense> = [];

    try {
      const json = await AsyncStorage.getItem(StorageKeys.Spendings);
      data = json != null ? JSON.parse(json) : [];
    } catch (err) {
      console.log(err);
    }

    data = data.map((d) => ({
      ...d,
      createdAt: new Date(d.createdAt),
    }));

    data = data.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    if (data && shouldPopulateState) {
      expensesState.expenses = data;
      expensesState.totalThisMonth = computeExpensesTotal(data);
    }

    // get expenses withing first day of month and today
    if (data && inThisMonth) {
      const date = new Date();
      const firstDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getTime();

      data = data.filter((d) => {
        const time = new Date(d.createdAt).getTime();
        return firstDay < time && time < lastDay;
      });
    }

    return data;
  }

  async addExpense(expense: Omit<Expense, 'id'>): Promise<Expense> {
    const current = await this.getSpendings(false);

    const newExpense: Expense = {
      id: uuidv4(),
      ...expense,
    };

    try {
      const data = JSON.stringify([...current, newExpense]);
      await AsyncStorage.setItem(StorageKeys.Spendings, data);
      await this.getSpendings();
    } catch (error) {
      console.log(error);
    }

    return newExpense;
  }

  async getMontlyExpensesAmount(): Promise<number> {
    const expenses = await this.getSpendings(false, true);

    return computeExpensesTotal(expenses);
  }
}
