import React, { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { TextProps } from 'react-native';
import { Text } from 'react-native';
import { FontSizes } from '../../constants';
import { useTheme } from '../../hooks';

export interface LabelProps extends TextProps {
  color?: ThemeColor;
  styles?: ViewStyle;
  fontSize?: FontSizes;
}

export const Label: React.FC<PropsWithChildren<LabelProps>> = ({
  children,
  styles = {},
  color = 'text',
  fontSize = FontSizes.MD,
  ...textProps
}) => {
  const { colors } = useTheme();

  const labelColor = useMemo<string>(() => colors[color], [colors, color]);

  return (
    <Text {...textProps} style={{ ...styles, color: labelColor, fontSize }}>
      {children}
    </Text>
  );
};
