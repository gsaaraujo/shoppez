import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SplashScreen from 'react-native-splash-screen';

import { AuthProvider } from './src/context/authProvider';

import { Routes } from './src/routes';

export const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </GestureHandlerRootView>
  );
};
