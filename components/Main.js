import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import HomeScreen from './main/HomeScreen';
import ProfileScreen from './main/ProfileScreen';
import StatsScreen from './main/StatsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchUser } from '../redux/actions/index';

const Tab = createMaterialBottomTabNavigator();

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.currentUser);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (!user) {
    return (
      <View style={styles.loadingView}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }} labeled={false}>
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={
          { tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home-circle' color={color} size={26} />
          )}
        }
      />
      <Tab.Screen
        name='Stats'
        component={StatsScreen}
        options={
          { tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='chart-pie' color={color} size={26} />
          )}
        }
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={
          { tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='account-circle' color={color} size={26} />
          )}
        }
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  loadingView: {
    flex: 1,
    justifyContent: 'center'
  }
});

export default Main;
