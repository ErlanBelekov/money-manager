import React, { PropsWithChildren, ReactNode } from 'react';
import { Pressable, PressableProps, View, ViewStyle } from 'react-native';
import { Spacing } from '../../constants';
import { Label, LabelProps } from '../../ui';

export interface ButtonProps extends PressableProps {
  rounded?: boolean;
  styles?: ViewStyle;
  labelProps?: LabelProps;
  bgColor?: string;
  labelColor?: ThemeColor;
  renderLeftItem?: () => ReactNode;
}

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  rounded,
  styles = {},
  labelProps = {},
  bgColor = '',
  labelColor = 'black',
  disabled = false,
  renderLeftItem = () => <></>,
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
        flexDirection: 'row',
        ...styles,
      }}>
      <View style={{}}>{renderLeftItem && renderLeftItem()}</View>
      <Label color={labelColor} {...labelProps}>
        {children}
      </Label>
    </Pressable>
  );
};
