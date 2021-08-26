import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { theme } from '../global/theme/styles';

import HomeSvg from '../assets/images/home.svg';
import ShoppingCartSvg from '../assets/images/shopping-cart.svg';
import ShoppingBagSvg from '../assets/images/shopping-bag.svg';

import { TabBarIcon } from '../components/TabBarIcon';

import { Home } from '../screens/Home';
import { ShoppingCart } from '../screens/ShoppingCart';
import { PurchaseHistory } from '../screens/PurchaseHistory';

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
        name='PurchaseHistory'
        component={PurchaseHistory}
        options={{
          headerTitle: 'Purchase History',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={ShoppingBagSvg} focused={focused} />
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
