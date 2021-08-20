import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { AuthRoute } from './auth.routes';
import { useAuth } from '../hooks/useAuth';

export const Routes = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <AuthRoute />
    </NavigationContainer>
  );
};
