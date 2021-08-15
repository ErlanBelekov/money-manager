declare interface Identifiable {
  readonly id: string;
}

declare interface Expense extends Identifiable {
  readonly name: string;
  readonly createdAt: Date;
  readonly amount: number;
}

declare type SpendingCategory =
  | 'FUN'
  | 'HOUSE'
  | 'FOOD'
  | 'PRODUCTIVITY'
  | 'TRANSPORTATION'
  | 'OTHER';

declare interface Theme {
  dark: boolean;
  colors: {
    [ThemeColor: string]: string;
  };
}

declare type ThemeColor =
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
  | 'pink';
