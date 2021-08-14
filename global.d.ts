declare interface Identifiable {
  readonly id: string;
}

declare interface Spending extends Identifiable {
  title: string;
  createdAt: Date;
  price: number;
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
  | 'black';
