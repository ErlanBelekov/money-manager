import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { FontSizes } from '../../constants';
import { useTheme } from '../../hooks';

interface InputWithAccessoryProps extends TextInputProps {
  renderAccessory?: () => JSX.Element;
  accessoryText?: string;
  inputStyles?: {};
  accessoryFontSize?: FontSizes;
}

export function InputWithAccessory({
  renderAccessory,
  accessoryText,
  accessoryFontSize = FontSizes.MD,
  ...textInputProps
}: InputWithAccessoryProps) {
  const {
    colors: { grey },
  } = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {renderAccessory ? (
        renderAccessory()
      ) : (
        <Text style={{ fontSize: accessoryFontSize, color: grey }}>
          {accessoryText}
        </Text>
      )}
      <TextInput {...textInputProps} />
    </View>
  );
}
