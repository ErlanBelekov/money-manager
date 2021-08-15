import React from 'react';
import { View, SectionList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Button, Header, SpendingSummary } from '../components';

import { useTheme, useExpenses } from '../hooks';

import { FontSizes, Spacing } from '../constants';
import { Label } from '../ui';

function SpendingsSeparator() {
  return <View style={{ height: Spacing.LG }} />;
}

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

  const testSections = [
    {
      title: 'Today',
      data: expenses,
    },
  ];

  const renderSpending = ({ item }: { item: Expense }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Label color="textPrimary" fontSize={FontSizes.LG}>
            {item.name}
          </Label>
        </View>
        <Label color="primary" fontSize={FontSizes.XL}>
          ${item.amount}
        </Label>
      </View>
    );
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
            <Button rounded labelColor="primary" onPress={onAddPress}>
              Add Expense
            </Button>
          );
        }}
      />
      <SectionList
        sections={testSections}
        keyExtractor={(item, index) => String(index)}
        renderSectionHeader={({ section: { title, key } }) => {
          return (
            <Label
              color="textPrimary"
              fontSize={FontSizes.TWOXL}
              styles={{
                marginTop: Number(key) !== 0 ? Spacing.LG : 0,
                paddingBottom: Spacing.MD,
              }}>
              {title}
            </Label>
          );
        }}
        renderItem={renderSpending}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        ItemSeparatorComponent={SpendingsSeparator}
        ListHeaderComponent={SpendingSummary}
      />
    </View>
  );
}
