import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import TabOneScreen from '../screens/TabOneScreen';
import LinkingConfiguration from './LinkingConfiguration';
import ReportScreen from '../screens/ReportScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={TabOneScreen} options={{ headerShown: true }} />
      <Drawer.Screen name="Report" component={ReportScreen} options={{ headerShown: true }} />
    </Drawer.Navigator>
  );
}
