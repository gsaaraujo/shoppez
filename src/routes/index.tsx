import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AppRoute } from './app.routes';
import { AuthRoute } from './auth.routes';

import { useAuth } from '../hooks/useAuth';
import { UserProvider } from '../context/userProvider';

export const Routes = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? (
        <UserProvider>
          <AppRoute />
        </UserProvider>
      ) : (
        <AuthRoute />
      )}
    </NavigationContainer>
  );
};
