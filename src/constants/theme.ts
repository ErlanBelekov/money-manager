import { DefaultTheme, Theme } from '@react-navigation/native';

export const darkTheme: Theme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: '#171717',
    primary: '#78DEC7',
    text: '#fff',
  },
};

export const lightTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
  },
};

export const extendedDarkThemeColors = {
  textPrimary: '#fff',
  textSecondary: '#EEEEEE',
  grey: '#999ca9',
};

export const extendedLightThemeColors = {
  textPrimary: '#000',
  textSecondary: '#000',
  grey: '#999ca9',
};
