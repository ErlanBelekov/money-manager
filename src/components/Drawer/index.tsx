import React from 'react';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { useTheme } from '../../hooks';

interface DrawerProps {
  navigation: DrawerNavigationHelpers;
  state: any;
  descriptors: any;
}

export function Drawer(props: DrawerProps) {
  const {
    colors: { background },
  } = useTheme();

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: background }}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
