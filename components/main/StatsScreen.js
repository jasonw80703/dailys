import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PersonalStats from '../stats/PersonalStats';
import GlobalStats from '../stats/GlobalStats';

const Tab = createMaterialTopTabNavigator();

const StatsScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Personal" component={PersonalStats} />
      <Tab.Screen name="Global" component={GlobalStats} />
    </Tab.Navigator>
  );
};

export default StatsScreen;