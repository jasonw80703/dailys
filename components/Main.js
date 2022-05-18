import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import HomeScreen from './main/HomeScreen';
import ProfileScreen from './main/ProfileScreen';
import StatsScreen from './main/StatsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchUser } from '../redux/actions/index';

const Tab = createBottomTabNavigator();

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.currentUser);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (!user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={
          { tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          )}
        }
      />
      <Tab.Screen
        name='Stats'
        component={StatsScreen}
        options={
          { tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='chart-bar' color={color} size={26} />
          )}
        }
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={
          { tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account' color={color} size={26} />
          )}
        }
      />
    </Tab.Navigator>
  );
};

export default Main;
