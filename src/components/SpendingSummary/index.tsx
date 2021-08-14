import React from 'react';
import { View, Text } from 'react-native';
import { FontSizes } from '../../constants/fontSizes';
import { Spacing } from '../../constants/spacings';
import { useTheme } from '../../hooks';

export function SpendingSummary() {
  const {
    colors: { primary, textSecondary },
  } = useTheme();

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
      }}>
      <Text
        style={{
          fontSize: FontSizes.FIVEXL + FontSizes.LG,
          fontWeight: 'bold',
          color: primary,
        }}>
        $100
      </Text>
      <Text
        style={{
          marginTop: Spacing.XS,
          color: textSecondary,
          fontSize: FontSizes.SM,
        }}>
        spent since beginning of the month
      </Text>
    </View>
  );
}
