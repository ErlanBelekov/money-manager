import { DefaultTheme, Theme } from '@react-navigation/native';

export const darkTheme: Theme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    // background: '#11052C',
    // primary: '#3D087B',
    // text: '#fff',
    background: '#11052C',
    primary: '#3D087B',
    text: '#fff',
  },
};

export const lightTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#f2f2f7',
    primary: '#3D087B',
    text: '#000',
  },
};

export const extendedDarkThemeColors = {
  textPrimary: '#fff',
  textSecondary: '#fff',
  backgroundSecondary: '#1f1140', // #f2f2f7
  accent: '#F43B86',
  grey: '#999ca9',
  white: '#fff',
  black: '#000',
  error: '#FF2626',
  yellow: '#FFE459',
  pink: '#F43B86',
};

export const extendedLightThemeColors = {
  textPrimary: '#000',
  textSecondary: '#000',
  backgroundSecondary: '#5c10b5',
  accent: '#F43B86',
  grey: '#999ca9',
  white: '#fff',
  black: '#000',
  error: '#FF2626',
  yellow: '#FFE459',
  pink: '#F43B86',
};
