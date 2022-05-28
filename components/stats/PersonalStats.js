import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ListItem, Text, Overlay } from '@rneui/base';
import { View, StyleSheet } from 'react-native';
import { fetchUserDailys, setUserDailysLoading } from '../../redux/actions/index';
import Loader from '../shared/Loader';
import DailysSummary from './DailysSummary';

// TODO: consider doing this in <StatsScreen /> and passing data here to props
// https://stackoverflow.com/questions/60439210/how-to-pass-props-to-screen-component-with-a-tab-navigator
const useForceUpdate = () => {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
};

// TODO: wtf why are you doing 6 renders
// TODO: let's do pagination for 2.0
const PersonalStats = ({ navigation }) => {
  const dispatch = useDispatch();
  const forceUpdate = useForceUpdate();
  const [showModal, setShowModal] = useState(false);
  const [currentUserDaily, setCurrentUserDaily] = useState(null);
  const userDailys = useSelector((state) => state.userDailysState.userDailys);
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
    dispatch(setUserDailysLoading());
    dispatch(fetchUserDailys());
  }, [dispatch]);

  // console.log('render');

  if (isLoading) { return <Loader />; }

  if (userDailys === undefined || userDailys.length == 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No Data Found!</Text>
      </View>
    );
  }

  return (
    <View>
      {
        userDailys.map((l, i) => (
          <ListItem key={i} bottomDivider onPress={() => {
            setCurrentUserDaily(l);
            setShowModal(!showModal);
          }}>
            <ListItem.Content>
              <ListItem.Title>{l.date}</ListItem.Title>
              <DailysSummary daily={l} />
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
      <Overlay overlayStyle={styles.overlay} isVisible={showModal} onBackdropPress={() => setShowModal(!showModal)}>
        <Text>{currentUserDaily?.date}</Text>
        <Text>
          {
            [currentUserDaily?.ans1, currentUserDaily?.ans2, currentUserDaily?.ans3].map((ans, i) => (
              ans?.toString()
            ))
          }
        </Text>
        <Button title='Close' onPress={() => setShowModal(!showModal)}/>
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  checkmarks: {
  },
  overlay: {
    backgroundColor: 'white',
    width: 300,
    height: 100,
  }
});

PersonalStats.propTypes = {
  navigation: PropTypes.shape({
    addListener: PropTypes.func,
  }),
};

export default PersonalStats;
