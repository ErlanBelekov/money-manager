import { ExpenseCategory } from '../types';

export const expenseCategories: ExpenseCategory[] = [
  ExpenseCategory.FOOD,
  ExpenseCategory.HOUSE,
  ExpenseCategory.TRANSPORTATION,
  ExpenseCategory.FUN,
  ExpenseCategory.SELF_DEVELOPMENT,
  ExpenseCategory.OTHER,
];

export const categoryNamesDict: { [key: string]: string } = {
  [ExpenseCategory.FOOD]: '🍣 Food',
  [ExpenseCategory.FUN]: '🦄 Fun',
  [ExpenseCategory.TRANSPORTATION]: '🚌 Transportation',
  [ExpenseCategory.HOUSE]: '🏡 House',
  [ExpenseCategory.SELF_DEVELOPMENT]: '🌟 Self development',
  [ExpenseCategory.OTHER]: '💩 Other',
};

export const expenseCategoriesSigns: { [key: string]: string } = {
  [ExpenseCategory.FOOD]: '🍣',
  [ExpenseCategory.FUN]: '🦄',
  [ExpenseCategory.TRANSPORTATION]: '🚌',
  [ExpenseCategory.HOUSE]: '🏡',
  [ExpenseCategory.SELF_DEVELOPMENT]: '🌟',
  [ExpenseCategory.OTHER]: '💩',
};
