import React from 'react';
import { StatusBar } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { theme } from '../global/theme/styles';

import { BottomTab } from './bottomTab.routes';

export const AppRoute = () => {
  const { Navigator, Screen } = createNativeStackNavigator();

  const { background } = theme.colors;

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={background} />
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name='BottomTab' component={BottomTab} />
      </Navigator>
    </>
  );
};
