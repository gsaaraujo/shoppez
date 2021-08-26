import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { theme } from '../global/theme/styles';

import HomeSvg from '../assets/images/home.svg';
import ShoppingCartSvg from '../assets/images/shopping-cart.svg';

import { Home } from '../screens/Home';
import { ShoppingCart } from '../screens/ShoppingCart';
import { TabBarIcon } from '../components/TabBarIcon';

export const BottomTab = () => {
  const { Navigator, Screen } = createBottomTabNavigator();

  const { background } = theme.colors;

  return (
    <Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: background },
      }}>
      <Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={HomeSvg} focused={focused} />
          ),
        }}
      />
      <Screen
        name='ShoppingCart'
        component={ShoppingCart}
        options={{
          headerTitle: 'Shopping cart',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={ShoppingCartSvg} focused={focused} />
          ),
        }}
      />
    </Navigator>
  );
};
