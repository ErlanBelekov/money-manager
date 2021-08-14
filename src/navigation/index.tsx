import * as React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { darkTheme, lightTheme } from '../constants';
import { AddSpending, HomeScreen } from '../screens';

const RootStack = createNativeStackNavigator();

export default function RootNavigationContainer() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'light' ? lightTheme : darkTheme}>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </RootStack.Group>
        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen
            name="AddSpending"
            component={AddSpending}
            options={{ headerShown: false }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
