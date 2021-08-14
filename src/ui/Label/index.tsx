import React, { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { TextStyle } from 'react-native';
import { TextProps } from 'react-native';
import { Text } from 'react-native';
import { FontSizes } from '../../constants';
import { useTheme } from '../../hooks';

type FontFamily = 'body';

type FontWeight = 'bold' | 'normal';

export interface LabelProps extends TextProps {
  color?: ThemeColor;
  styles?: TextStyle;
  fontSize?: FontSizes;
  fontFamily?: FontFamily;
  fontWeight?: FontWeight;
}

export const Label: React.FC<PropsWithChildren<LabelProps>> = ({
  children,
  styles = {},
  color = 'text',
  fontSize = FontSizes.MD,
  fontWeight = 'normal',
  ...textProps
}) => {
  const { colors } = useTheme();

  const labelColor = useMemo<string>(() => colors[color], [colors, color]);

  const finalFontFamily = useMemo<string>(() => {
    if (fontWeight === 'bold') {
      return 'AtkinsonHyperlegible-Bold';
    }
    return 'AtkinsonHyperlegible-Regular';
  }, [fontWeight]);

  return (
    <Text
      {...textProps}
      style={{
        ...styles,
        color: labelColor,
        fontSize,
        fontFamily: finalFontFamily,
      }}>
      {children}
    </Text>
  );
};
