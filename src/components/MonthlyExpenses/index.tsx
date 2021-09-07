import React, { useMemo } from 'react';
import { SectionList, View, Text } from 'react-native';
import { formatRelative } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';

import { FontSizes, Spacing, expenseCategoriesSigns } from '../../constants';
import { SpendingSummary } from '../SpendingSummary';
import { Expense } from '../../types';
import { Label } from '../../ui';
import { useTheme } from '../../hooks';

interface Section {
  title: string;
  data: Expense[];
}

interface MontlyExpensesProps {
  expenses: Expense[];
}

const SIGN_DIM = 58;

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

export function MontlyExpenses({ expenses }: MontlyExpensesProps) {
  const {
    colors: { backgroundSecondary },
  } = useTheme();

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

    Object.keys(expensesByDays)
      .reverse()
      .forEach((day: string) => {
        result = [...result, { title: day, data: expensesByDays[Number(day)] }];
      });

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
  );
}
