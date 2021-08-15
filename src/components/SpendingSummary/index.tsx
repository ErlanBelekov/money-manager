import React from 'react';
import { View } from 'react-native';
import { FontSizes } from '../../constants/fontSizes';
import { Spacing } from '../../constants/spacings';
import { useExpenses } from '../../hooks';
import { Label } from '../../ui';

export function SpendingSummary() {
  const { totalThisMonth } = useExpenses();

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
      }}>
      <Label
        fontSize={FontSizes.FIVEXL + FontSizes.LG}
        color="primary"
        fontWeight="bold">
        {`$${totalThisMonth}`}
      </Label>
      <Label
        styles={{ marginTop: Spacing.XS }}
        color="textSecondary"
        fontSize={FontSizes.SM}>
        spent since beginning of the month
      </Label>
    </View>
  );
}
