import React from 'react';
import { SectionList, View, Text } from 'react-native';
// import { formatRelative } from 'date-fns';
import { SpendingSummary } from '../SpendingSummary';
import { useTheme } from '../../hooks';
import { FontSizes } from '../../constants';
import { Spacing } from '../../constants/spacings';

function SpendingsSeparator() {
  return <View style={{ height: Spacing.LG }} />;
}

export function SpendingsList() {
  const now = new Date();
  const testSpendings: Spending[] = [
    {
      id: '1',
      title: 'Buy new Shoes',
      createdAt: new Date(),
      price: 25,
    },
    {
      id: '2',
      title: 'Buy Shawarma',
      createdAt: new Date(),
      price: 5,
    },
  ];

  const testSections = [
    {
      title: 'Today',
      data: testSpendings,
    },
    {
      title: 'Yesterday',
      data: testSpendings,
    },
    {
      title: '25 June',
      data: testSpendings,
    },
  ];

  const {
    colors: { textPrimary, textSecondary, primary },
  } = useTheme();

  const renderSpending = ({ item }: { item: Spending }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={{ color: textPrimary, fontSize: FontSizes.LG }}>
            {item.title}
          </Text>
          {/* <Text style={{ marginTop: Spacing.SM, color: textSecondary }}>
            {formatRelative(item.createdAt, now)}
          </Text> */}
        </View>
        <Text style={{ color: primary, fontSize: FontSizes.XL }}>
          ${item.price}
        </Text>
      </View>
    );
  };

  return (
    <SectionList
      sections={testSections}
      keyExtractor={(item, index) => String(index)}
      renderSectionHeader={({ section: { title, key } }) => {
        return (
          <Text
            style={{
              color: textPrimary,
              fontSize: FontSizes.TWOXL,
              marginTop: Number(key) !== 0 ? Spacing.LG : 0,
              paddingBottom: Spacing.MD,
            }}>
            {title}
          </Text>
        );
      }}
      renderItem={renderSpending}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      ItemSeparatorComponent={SpendingsSeparator}
      ListHeaderComponent={SpendingSummary}
    />
  );
}
