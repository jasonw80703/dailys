import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { COMPLETE, INCOMPLETE, NOT_DONE } from '../../constants/icons';
import { Text } from '@rneui/base';

const DailysSummary = ({ daily }) => {
  if (!daily) {
    return (
      <View>
        <Text>No data</Text>
      </View>
    );
  }

  return (
    <View>
      {
        [daily.ans1, daily.ans2, daily.ans3].map((ans, i) => (
          ans === null ?
            <Text key={i} style={{ color: 'gray' }}>{NOT_DONE}</Text> :
            ans ?
              <Text key={i} style={{ color: 'green' }}>{COMPLETE}</Text> :
              <Text key={i} style={{ color: 'red' }}>{INCOMPLETE}</Text>
        ))
      }
    </View>
  );
};

DailysSummary.propTypes = {
  daily: PropTypes.shape({
    date: PropTypes.string.isRequired,
    ans1: PropTypes.bool,
    ans2: PropTypes.bool,
    ans3: PropTypes.bool,
  }),
};

export default DailysSummary;
