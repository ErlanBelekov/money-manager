import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button, Header, MontlyExpenses } from '../components';

import { useTheme, useExpenses } from '../hooks';

export function HomeScreen() {
  const {
    colors: { background },
  } = useTheme();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const onAddPress = () => {
    navigation.push('AddSpending');
  };

  const { expenses } = useExpenses();

  console.log('current expenses: \n', expenses);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background,
      }}>
      <Header
        title="Overview"
        renderRightItems={() => {
          return (
            <Button rounded labelColor="primary" onPress={onAddPress}>
              Add Expense
            </Button>
          );
        }}
      />
      <MontlyExpenses expenses={expenses} />
    </View>
  );
}
