import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { theme } from '../global/theme/styles';

import HomeSvg from '../assets/images/home.svg';
import BellSvg from '../assets/images/bell.svg';
import HeartSvg from '../assets/images/heart.svg';
import ShoppingBagSvg from '../assets/images/shopping-bag.svg';
import ShoppingCartSvg from '../assets/images/shopping-cart.svg';

import { TabBarIcon } from '../components/TabBarIcon';

import { Home } from '../screens/Home';
import { Favorites } from '../screens/Favorites';
import { ShoppingCart } from '../screens/ShoppingCart';
import { Notifications } from '../screens/Notifications';
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
        name='Favorites'
        component={Favorites}
        options={{
          headerTitle: 'Favorites',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={HeartSvg} focused={focused} />
          ),
        }}
      />
      <Screen
        name='Notifications'
        component={Notifications}
        options={{
          headerTitle: 'Notifications',
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={BellSvg} focused={focused} />
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
