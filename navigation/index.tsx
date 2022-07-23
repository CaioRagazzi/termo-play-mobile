import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

import TabOneScreen from '../screens/TabOneScreen';
import LinkingConfiguration from './LinkingConfiguration';
import ReportScreen from '../screens/GameHistory/ReportScreen';
import ReportDetailScreen from '../screens/GameHistory/ReportDetailScreen';
import { ReportParamList } from './NavigationTypes';

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
      <Drawer.Screen name="ReportStack" component={ReportNavigation} options={{ headerShown: true }} />
    </Drawer.Navigator>
  );
}

const ReportStack = createStackNavigator<ReportParamList>();

function ReportNavigation() {
  return (
    <ReportStack.Navigator>
      <ReportStack.Screen name="Report" component={ReportScreen} />
      <ReportStack.Screen name="ReportDetail" component={ReportDetailScreen} />
    </ReportStack.Navigator>
  );
}
