import React from 'react';
import { StatusBar } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { theme } from '../global/theme/styles';

import { BottomTab } from './bottomTab.routes';
import { ProductDetails } from '../screens/ProductDetails';
import { PaymentConfirm } from '../screens/PaymentConfirm';

export const AppRoute = () => {
  const { Navigator, Screen } = createNativeStackNavigator();

  const { background } = theme.colors;

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={background} />
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name='BottomTab' component={BottomTab} />
        <Screen name='ProductDetails' component={ProductDetails} />
        <Screen name='PaymentConfirm' component={PaymentConfirm} />
      </Navigator>
    </>
  );
};
