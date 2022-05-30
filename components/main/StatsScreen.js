/* eslint-disable react/no-children-prop */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PersonalStats from '../stats/PersonalStats';
import { fetchUserDailys, setUserDailysLoading } from '../../redux/actions/index';
import GlobalStats from '../stats/GlobalStats';
import { useDispatch, useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

const useForceUpdate = () => {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
};

const StatsScreen = ({ navigation }) => {
  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();

  const userDailys = useSelector((state) => state.userDailysState.userDailys);
  const isLoadingUserDailys = useSelector((state) => state.userDailysState.isLoading);

  useEffect(() => {
    // This is for being able to render every time we click on the bottom tab
    const unsubscribe = navigation.addListener('tabPress', () => {
      forceUpdate();
      dispatch(setUserDailysLoading());
      dispatch(fetchUserDailys());
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  useEffect(() => {
    dispatch(setUserDailysLoading());
    dispatch(fetchUserDailys());
  }, [dispatch]);

  return (
    <Tab.Navigator style={{ paddingTop: Platform.OS === 'android' ? 50 : 0 }}>
      <Tab.Screen name='Personal' children={
        props =>
          <PersonalStats
            userDailys={userDailys}
            isLoadingUserDailys={isLoadingUserDailys}
            {...props}
          />
      } />
      <Tab.Screen name='Global' component={GlobalStats} />
    </Tab.Navigator>
  );
};

StatsScreen.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func,
  }),
};

export default StatsScreen;