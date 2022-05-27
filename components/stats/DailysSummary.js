import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { COMPLETE, INCOMPLETE, NOT_DONE } from '../../constants/icons';
import { Text } from '@rneui/base';

const DailysSummary = ({ daily }) => {
  return (
    <View>
      <Text>
        {
          [daily.ans1, daily.ans2, daily.ans3].map((ans, i) => (
            ans === null ?
              <span key={i} style={{ color: 'gray' }}>{NOT_DONE}</span> :
              ans ?
                <span key={i} style={{ color: 'green' }}>{COMPLETE}</span> :
                <span key={i} style={{ color: 'red' }}>{INCOMPLETE}</span>
          ))
        }
      </Text>
    </View>
  );
};

DailysSummary.propTypes = {
  daily: PropTypes.shape({
    date: PropTypes.string.isRequired,
    ans1: PropTypes.bool,
    ans2: PropTypes.bool,
    ans3: PropTypes.bool,
  }).isRequired,
};

export default DailysSummary;
