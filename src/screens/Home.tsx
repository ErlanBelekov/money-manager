import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Header } from '../components/Header';
import { SpendingsList } from '../components/SpendingsList';
import { useSpendings } from '../hooks';

export function HomeScreen() {
  const {
    colors: { background },
  } = useTheme();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [] = useSpendings();

  const onAddPress = () => {
    navigation.push('AddSpending');
  };

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
            <Pressable
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'green',
                padding: 10,
                borderRadius: 10,
              }}
              onPress={onAddPress}>
              <Text>Add Spending</Text>
            </Pressable>
          );
        }}
      />
      <SpendingsList />
    </View>
  );
}
