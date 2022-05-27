import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDailys, setUserDailysLoading } from '../../redux/actions/index';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PersonalStats from '../stats/PersonalStats';
import GlobalStats from '../stats/PersonalStats';
import PropTypes from 'prop-types';
import { Text } from '@rneui/base';
import { View } from 'react-native';
import Loader from '../shared/Loader';

const Tab = createMaterialTopTabNavigator();

const useForceUpdate = () => {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
};

const StatsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();
  const userDailys = useSelector((state) => state.userDailysState.userDailys);
  // console.log(userDailys);
  const isLoading = useSelector((state) => state.userDailysState.isLoading);

  useEffect(() => {
    // This is for being able to render every time we click on the tab
    const unsubscribe = navigation.addListener('tabPress', () => {
      forceUpdate();
      dispatch(setUserDailysLoading());
      dispatch(fetchUserDailys());
    });

    return unsubscribe;
  }, [navigation, dispatch]);

  useEffect(() => {
    // console.log('again');
    dispatch(setUserDailysLoading());
    dispatch(fetchUserDailys());
  }, [dispatch]);

  if (isLoading) { return <Loader />; }

  if (userDailys === undefined || userDailys.length == 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Data Found!</Text>
      </View>
    );
  }

  // console.log('render');
  return (
    <Tab.Navigator>
      <Tab.Screen name="Personal" component={PersonalStats} />
      <Tab.Screen name="Global" component={GlobalStats} />
    </Tab.Navigator>
  );
};

StatsScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default StatsScreen;