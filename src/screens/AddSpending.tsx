import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { FontSizes, Spacing, extendedLightThemeColors } from '../constants';
import { SpendingCategoryInput } from '../components/SpendingCategoryInput';
import { InputWithAccessory } from '../components/InputWithAccessory';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 80,
    paddingHorizontal: Spacing.MD,
  },
});

export function AddSpending() {
  // const [step, setStep] = useState(0);
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [purpose, setPurpose] = useState('');
  const [activeEmojiIndex, setActiveEmojiIndex] = useState(0);

  return (
    <View style={styles.screen}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <SpendingCategoryInput
          active={activeEmojiIndex}
          setActive={setActiveEmojiIndex}
        />
        <TextInput
          value={purpose}
          onChangeText={(text) => setPurpose(text)}
          placeholder="Restaurant Takeout"
          style={{
            marginTop: Spacing.XL,
            fontSize: FontSizes.THREEXL,
            fontWeight: 'bold',
          }}
        />

        <View style={{ marginTop: Spacing.XL * 4 }}>
          <InputWithAccessory
            accessoryText="$"
            accessoryFontSize={FontSizes.FIVEXL}
            style={{ fontSize: FontSizes.FIVEXL + 2 }}
            onChangeText={(text) => {
              if (!text) {
                setPrice(undefined);
                return;
              }
              const converted = Number(text);
              if (typeof converted === 'number' && !Number.isNaN(converted)) {
                setPrice(converted);
              } else {
                setPrice(undefined);
              }
            }}
            value={typeof price === 'number' ? String(price) : undefined}
            placeholder="0"
            placeholderTextColor={extendedLightThemeColors.grey}
            keyboardType="numeric"
            returnKeyType="done"
          />
        </View>
      </View>
    </View>
  );
}
