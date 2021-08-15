import React from 'react';
import { View } from 'react-native';

import { Header } from '../components';

import { useTheme } from '../hooks';

export function SettingsScreen() {
  const {
    colors: { background },
  } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background,
      }}>
      <Header title="Settings" />
    </View>
  );
}
