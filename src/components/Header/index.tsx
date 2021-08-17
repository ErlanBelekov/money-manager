import React, { ReactNode } from 'react';
import { Image, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/core';

import { FontSizes, Spacing } from '../../constants';
import { useTheme } from '../../hooks';
import { Label } from '../../ui';

import menuIcon from '../../assets/icons/menu.png';
export interface HeaderProps {
  title: string;
  renderRightItems?: () => ReactNode;
}

export function Header({ title, renderRightItems }: HeaderProps) {
  const {
    colors: { background },
  } = useTheme();

  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const colorScheme = useColorScheme();

  const { top } = useSafeAreaInsets();

  const onMenuPress = () => {
    navigation.toggleDrawer();
  };

  return (
    <View
      style={{
        backgroundColor: background,
        paddingTop: top + Spacing.SM,
        paddingHorizontal: 16,
        paddingBottom: Spacing.XS,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Pressable onPress={onMenuPress}>
        <Image
          source={menuIcon}
          style={{
            height: FontSizes.THREEXL,
            width: FontSizes.THREEXL,
            tintColor: colorScheme === 'dark' ? 'white' : '#000',
          }}
        />
      </Pressable>
      <Label
        styles={{ marginLeft: Spacing.XS }}
        color="textPrimary"
        fontSize={FontSizes.XL}
        fontWeight="bold">
        {title}
      </Label>
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
