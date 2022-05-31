import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text } from '@rneui/base';
import { View } from 'react-native';
import { fetchDailys, fetchUserDailysByDate, setUserDailysLoading } from '../../redux/actions/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { DAILY_DATE_FORMAT } from '../../constants/dates';
import Loader from '../shared/Loader';

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

  const formatAnswer = (ans) => {
    if (ans.total === 0) { return '0%'; }

    const percent = ((ans.completed / ans.total) * 100);
    if (percent === 0) { return '0%'; }

    return percent.toFixed(2).toString() + '%';
  };

  if (isLoadingUserDailys) { return <Loader />; }

  return (
    <View>
      <Text>Date: {formattedDate}</Text>
      <Button title="Open" onPress={() => setShowModal(true)} />
      {showModal && (
        <DateTimePicker
          value={date || new Date()}
          onChange={onChange}
          minimumDate={new Date(2022, 4, 24)}
          maximumDate={new Date()}
        />
      )}
      {!userDaily &&
        <View>
          <Text>No data found for this date...</Text>
        </View>
      }
      {/* TODO (NEXT): display data properly */}
      {!!userDaily &&
        <View>
          <Text>{daily.prompt1}</Text>
          <Text>{formatAnswer(userDaily.ans1)}</Text>
          <Text>{daily.prompt2}</Text>
          <Text>{formatAnswer(userDaily.ans2)}</Text>
          <Text>{daily.prompt3}</Text>
          <Text>{formatAnswer(userDaily.ans3)}</Text>
        </View>
      }
    </View>
  );
};

export default GlobalStats;
