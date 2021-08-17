import React from 'react';
import { useMemo } from 'react';
import { View, SectionList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import enGB from 'date-fns/locale/en-GB';

import { Button, Header, SpendingSummary } from '../components';

import { useTheme, useExpenses } from '../hooks';

import { expenseCategoriesSigns, FontSizes, Spacing } from '../constants';
import { Label } from '../ui';

import { Expense } from '../types';
import { formatRelative } from 'date-fns';

const SIGN_DIM = 58;

interface Section {
  title: string;
  data: Expense[];
}

const formatRelativeLocale: { [key: string]: string } = {
  lastWeek: "'Last' eeee",
  yesterday: "'Yesterday'",
  today: "'Today'",
  tomorrow: "'Tomorrow'",
  nextWeek: "'Next' eeee",
  other: 'dd.MM.yyyy',
};

const locale = {
  ...enGB,
  formatRelative: (token: string) => formatRelativeLocale[token],
};

function SpendingsSeparator() {
  return <View style={{ height: Spacing.LG }} />;
}

export function HomeScreen() {
  const {
    colors: { background, backgroundSecondary },
  } = useTheme();

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const onAddPress = () => {
    navigation.push('AddSpending');
  };

  const { expenses } = useExpenses();

  console.log('current expenses: \n', expenses);

  const montlyExpensesSections = useMemo<Section[]>(() => {
    let result: Section[] = [];
    const expensesByDays: { [day: number]: Expense[] } = {};

    expenses.forEach((exp) => {
      const k = exp.createdAt.getDate();
      if (expensesByDays[k] && Array.isArray(expensesByDays[k])) {
        expensesByDays[k] = [...expensesByDays[k], exp];
      } else {
        expensesByDays[k] = [exp];
      }
    });

    for (const exps in expensesByDays) {
      if (expensesByDays.hasOwnProperty(exps)) {
        result = [...result, { title: exps, data: expensesByDays[exps] }];
      }
    }

    return result;
  }, [expenses]);

  const renderSpending = ({ item }: { item: Expense }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              height: SIGN_DIM,
              width: SIGN_DIM,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: SIGN_DIM / 2,
              backgroundColor: backgroundSecondary,
              marginRight: Spacing.SM,
            }}>
            <Text style={{ fontSize: FontSizes.LG }}>
              {expenseCategoriesSigns[item.category]}
            </Text>
          </View>
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
      <SectionList<Expense, Section>
        sections={montlyExpensesSections}
        keyExtractor={(item, index) => String(index)}
        renderSectionHeader={({ section: { data, key } }) => {
          return (
            <Label
              color="textPrimary"
              fontSize={FontSizes.TWOXL}
              styles={{
                marginTop: Number(key) !== 0 ? Spacing.LG : 0,
                paddingBottom: Spacing.MD,
              }}>
              {formatRelative(new Date(data[0].createdAt), new Date(), {
                locale,
              })}
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
