import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, Text } from '@rneui/base';
import { View } from 'react-native';
import { fetchDailys, setDailysLoading } from '../../redux/actions/index';
import Loader from '../shared/Loader';
import DailysSummary from './DailysSummary';
import DailyOverlay from './DailyOverlay';

// TODO: wtf why are you doing 6 renders
// TODO: let's do pagination for 2.0
const PersonalStats = ({ isLoadingUserDailys, userDailys}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currentUserDaily, setCurrentUserDaily] = useState(null);

  const dailys = useSelector((state) => state.dailysState.dailys);
  const isLoadingDailys = useSelector((state) => state.dailysState.isLoading);

  const clickDaily = (daily) => {
    setCurrentUserDaily(daily);
    if (!dailys[daily.date]) {
      dispatch(setDailysLoading());
      dispatch(fetchDailys(daily.date));
    }
    setShowModal(!showModal);
  };

  const currentDaily = dailys[currentUserDaily?.date];

  if (isLoadingUserDailys) { return <Loader />; }

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
          <ListItem key={i} bottomDivider onPress={() => clickDaily(l)}>
            <ListItem.Content>
              <ListItem.Title>{l.date}</ListItem.Title>
              <DailysSummary daily={l} />
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        ))
      }
      <DailyOverlay
        isLoading={isLoadingDailys}
        showModal={showModal}
        setShowModal={setShowModal}
        currentDaily={currentDaily}
        currentUserDaily={currentUserDaily}
      />
    </View>
  );
};

PersonalStats.propTypes = {
  userDailys: PropTypes.any,
  isLoadingUserDailys: PropTypes.bool,
};

export default PersonalStats;
