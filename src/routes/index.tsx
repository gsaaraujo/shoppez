import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { AuthRoute } from './auth.routes';

export const Routes = () => {
  return (
    <NavigationContainer>
      <AuthRoute />
    </NavigationContainer>
  );
};
