import React, { useMemo } from 'react';
import { ViewStyle, PressableProps, Pressable } from 'react-native';
import { Label } from '../Label';
import { useTheme } from '../../hooks';
import { ThemeColor } from '../../types';
import { FontSizes, Spacing } from '../../constants';

export interface TagProps extends PressableProps {
  color?: ThemeColor;
  styles?: ViewStyle;
  text: string;
}

export const Tag = ({
  color = 'accent',
  styles = {},
  text,
  ...pressableProps
}: TagProps) => {
  const { colors } = useTheme();

  const bgColor = useMemo<string>(() => colors[color], [colors, color]);

  return (
    <Pressable
      style={{
        backgroundColor: bgColor,
        paddingHorizontal: Spacing.MD,
        paddingVertical: Spacing.XS,
        borderRadius: Spacing.SM,
        ...styles,
      }}
      {...pressableProps}>
      <Label fontSize={FontSizes.MD} color="white">
        {text}
      </Label>
    </Pressable>
  );
};
