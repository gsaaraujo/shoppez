import React from 'react';
import { StatusBar } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

import { theme } from '../global/theme/styles';

export const AuthRoute = () => {
  const { Navigator, Screen } = createNativeStackNavigator();
  const { background } = theme.colors;

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={background} />
      <Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: background,
          },
        }}>
        <Screen name='SignIn' component={SignIn} />
        <Screen name='SignUp' component={SignUp} />
      </Navigator>
    </>
  );
};
