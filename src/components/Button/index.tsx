import React, { PropsWithChildren } from 'react';
import { Pressable, PressableProps, ViewStyle } from 'react-native';
import { Spacing } from '../../constants';
import { Label, LabelProps } from '../../ui';

export interface ButtonProps extends PressableProps {
  rounded?: boolean;
  styles?: ViewStyle;
  labelProps?: LabelProps;
  bgColor?: string;
  labelColor?: ThemeColor;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  rounded,
  styles = {},
  labelProps = {},
  bgColor = '',
  labelColor = 'black',
  disabled = false,
  ...pressableProps
}) => {
  return (
    <Pressable
      {...pressableProps}
      style={{
        ...(rounded
          ? {
              borderRadius: 12,
            }
          : {}),
        ...(disabled ? {} : {}),
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.SM,
        backgroundColor: bgColor,
        ...styles,
      }}>
      <Label color={labelColor} {...labelProps}>
        {children}
      </Label>
    </Pressable>
  );
};
