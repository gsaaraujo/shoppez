import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { theme } from '../global/theme/styles';

import HomeSvg from '../assets/images/home.svg';

import { Home } from '../screens/Home';
import { TabBarIcon } from '../components/TabBarIcon';

export const BottomTab = () => {
  const { Navigator, Screen } = createBottomTabNavigator();

  const { background } = theme.colors;

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: background },
      }}>
      <Screen
        name='Home'
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={HomeSvg} focused={focused} />
          ),
        }}
      />
    </Navigator>
  );
};
