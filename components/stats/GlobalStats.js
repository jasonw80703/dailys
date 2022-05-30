import React, { useState } from 'react';
import { Button, Text } from '@rneui/base';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const GlobalStats = () => {
  const [date, setDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowModal(false);

    if (event?.type === 'dismissed') {
      setDate(date);
      return;
    }

    setDate(currentDate);
  };

  return (
    <View>
      <Text>Global Stats</Text>
      <Text>selected: {date?.toLocaleString()}</Text>
      <Button title="Open" onPress={() => setShowModal(true)} />
      {showModal && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default GlobalStats;
