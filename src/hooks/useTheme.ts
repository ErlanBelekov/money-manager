import { useTheme as useThemeLib } from '@react-navigation/native';
import {
  extendedDarkThemeColors,
  extendedLightThemeColors,
} from '../constants';

export function useTheme(): Theme {
  const theme = useThemeLib();

  return {
    ...theme,
    colors: {
      ...theme.colors,
      ...(theme.dark ? extendedDarkThemeColors : extendedLightThemeColors),
    },
  };
}
