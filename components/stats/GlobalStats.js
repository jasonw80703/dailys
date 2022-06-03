import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text } from '@rneui/base';
import { StyleSheet, View } from 'react-native';
import { fetchDailys, fetchUserDailysByDate, setUserDailysLoading } from '../../redux/actions/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { DAILY_DATE_FORMAT } from '../../constants/dates';
import GlobalStatsSummary from './GlobalStatsSummary';

const GlobalStats = () => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const formattedDate = format(date, DAILY_DATE_FORMAT);

  const dailys = useSelector((state) => state.dailysState.dailys);
  const globalUserDailys = useSelector((state) => state.userDailysState.globalUserDailys);
  const isLoadingUserDailys = useSelector((state) => state.userDailysState.isLoading);

  const userDaily = globalUserDailys[formattedDate];
  const daily = dailys[formattedDate];

  const fetchDailysAndUserDailys = (dispatch, dateToFetch) => {
    if (!globalUserDailys[dateToFetch]) {
      dispatch(setUserDailysLoading());
      if (!dailys[dateToFetch]) {
        dispatch(fetchDailys(dateToFetch));
      }
      dispatch(fetchUserDailysByDate(dateToFetch));
    }
  };

  useEffect(() => {
    fetchDailysAndUserDailys(dispatch, formattedDate);
  }, [dispatch]);

  const onChange = (event, selectedDate) => {
    const formattedSelectedDate = format(selectedDate, DAILY_DATE_FORMAT);
    setShowModal(false);

    if (event?.type === 'dismissed') {
      setDate(date);
      return;
    }

    fetchDailysAndUserDailys(dispatch, formattedSelectedDate);
    setDate(selectedDate);
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>Date: {formattedDate}</Text>
        <Button title='Select Date' onPress={() => setShowModal(true)} />
      </View>
      <GlobalStatsSummary
        isLoading={isLoadingUserDailys}
        daily={daily}
        userDaily={userDaily}
      />
      {showModal && (
        <DateTimePicker
          value={date || new Date()}
          onChange={onChange}
          minimumDate={new Date(2022, 4, 24)}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
  },
  dateText: {
    padding: 15,
    fontSize: 35,
  },
});

export default GlobalStats;
