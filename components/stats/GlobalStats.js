import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text } from '@rneui/base';
import { View } from 'react-native';
import { fetchUserDailysByDate, setUserDailysLoading } from '../../redux/actions/index';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Loader from '../shared/Loader';

const GlobalStats = () => {
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const formattedDate = format(date, 'yyyy-LL-dd');

  const globalUserDailys = useSelector((state) => state.userDailysState.globalUserDailys);
  const isLoadingUserDailys = useSelector((state) => state.userDailysState.isLoading);

  const userDaily = globalUserDailys[formattedDate];

  useEffect(() => {
    if (!globalUserDailys[formattedDate]) {
      dispatch(fetchUserDailysByDate(formattedDate));
    }
  }, [dispatch]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowModal(false);

    if (event?.type === 'dismissed') {
      setDate(date);
      return;
    }

    // TODO (NEXT): fetch data for new date if not in store
    setDate(currentDate);
  };

  if (isLoadingUserDailys) { return <Loader />; }

  return (
    <View>
      <Text>Date: {date?.toLocaleString()}</Text>
      <Button title="Open" onPress={() => setShowModal(true)} />
      {showModal && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          onChange={onChange}
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
          <Text>{userDaily.ans1.total}</Text>
        </View>
      }
    </View>
  );
};

export default GlobalStats;
