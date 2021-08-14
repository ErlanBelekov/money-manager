import React, { PropsWithChildren } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

export const DismissKeyboard: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const onPress = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={onPress}>
      {children}
    </TouchableWithoutFeedback>
  );
};
