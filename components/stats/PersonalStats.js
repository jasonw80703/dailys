import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, Text } from '@rneui/base';
import { View, StyleSheet } from 'react-native';
import { fetchUserDailys, setUserDailysLoading } from '../../redux/actions/index';
import Loader from '../shared/Loader';
import DailysSummary from './DailysSummary';

// TODO: wtf why are you doing 6 renders
// TODO: let's do pagination for 2.0
const PersonalStats = () => {
  const dispatch = useDispatch();
  const userDailys = useSelector((state) => state.userDailysState.userDailys);
  const isLoading = useSelector((state) => state.userDailysState.isLoading);

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
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{l.date}</ListItem.Title>
              <DailysSummary daily={l} />
              {/* <ListItem.Subtitle right style={styles.checkmarks}>TODO</ListItem.Subtitle> */}
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  checkmarks: {
  }
});

export default PersonalStats;
