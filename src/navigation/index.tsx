import * as React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { darkTheme, lightTheme } from '../constants';
import { AddSpending, HomeScreen, SettingsScreen } from '../screens';

const RootStack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Drawer.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ headerShown: false }}
    />
  </Drawer.Navigator>
);

export default function RootNavigationContainer() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={scheme === 'light' ? lightTheme : darkTheme}>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen
            name="DrawerNavigator"
            component={DrawerNavigator}
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
