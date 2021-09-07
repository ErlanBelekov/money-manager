import React from 'react';
import { Pressable, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';

import { FontSizes, Spacing } from '../../constants';
import { useExpenses, useTheme } from '../../hooks';
import { Label } from '../../ui';

interface SummaryBoxProps {
  mainLabel: string;
  renderTopLabel: () => JSX.Element;
  onPress: () => void;
}

function SummaryBox({ mainLabel, renderTopLabel, onPress }: SummaryBoxProps) {
  const {
    colors: { white },
  } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        paddingHorizontal: Spacing.MD,
        paddingVertical: Spacing.MD,
        backgroundColor: white,
        width: '100%',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: Spacing.SM,
          }}>
          {renderTopLabel()}
        </View>
        <Label fontSize={FontSizes.MD}>{mainLabel}</Label>
      </View>
      {/* <FontAwesomeIcon icon={faChevronRight} size={FontSizes.LG} /> */}
    </Pressable>
  );
}

export function SpendingSummary() {
  const { totalThisMonth } = useExpenses();

  const {
    colors: { primary },
  } = useTheme();

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
      }}>
      <SummaryBox
        mainLabel={`$${totalThisMonth}`}
        renderTopLabel={() => (
          <>
            <FontAwesomeIcon
              icon={faMoneyBill}
              size={FontSizes.LG}
              color={primary}
              style={{ marginRight: Spacing.XS }}
            />
            <Label fontSize={FontSizes.LG} color="primary">
              Total this month
            </Label>
          </>
        )}
        onPress={() => {}}
      />
      {/* <Label
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
      </Label> */}
    </View>
  );
}
