import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontSizes } from '../../constants';
import { useTheme } from '../../hooks';

export interface HeaderProps {
  title: string;
  renderRightItems?: () => ReactNode;
}

export function Header({ title, renderRightItems }: HeaderProps) {
  const {
    colors: { background, textPrimary },
  } = useTheme();

  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        backgroundColor: background,
        paddingTop: top + 16,
        paddingHorizontal: 16,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          color: textPrimary,
          fontSize: FontSizes.THREEXL,
          fontWeight: 'bold',
          // flex: 1,
        }}>
        {title}
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        {renderRightItems && renderRightItems()}
      </View>
    </View>
  );
}
