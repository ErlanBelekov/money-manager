declare interface Identifiable {
  readonly id: string;
}

declare interface Spending extends Identifiable {
  title: string;
  createdAt: Date;
  price: number;
}

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
  | 'grey';
