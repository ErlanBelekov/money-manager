import * as React from 'react';
import { View, ViewStyle, TextInput, TextInputProps } from 'react-native';
import { FontSizes } from '../../constants';
import { useTheme } from '../../hooks';
import { Label } from '../../ui';

export interface TextInputWithlabelProps extends TextInputProps {
  styles?: ViewStyle;
  labelText: string;
  renderInputComponent?: () => React.ReactNode;
}

export const TextInputWithlabel: React.FC<TextInputWithlabelProps> = ({
  styles = {},
  labelText,
  renderInputComponent,
  ...textInputProps
}) => {
  const {
    colors: { grey },
  } = useTheme();

  return (
    <View style={{ ...styles }}>
      <Label fontSize={FontSizes.XL} fontWeight="bold">
        {labelText}
      </Label>
      {renderInputComponent ? (
        renderInputComponent()
      ) : (
        <TextInput
          {...textInputProps}
          style={{
            fontSize: FontSizes.MD,
            fontFamily: 'AtkinsonHyperlegible-Regular',
            color: grey,
          }}
        />
      )}
    </View>
  );
};
