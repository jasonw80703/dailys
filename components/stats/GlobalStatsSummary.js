import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/base';
import Loader from '../shared/Loader';

const GlobalStatsSummary = ({
  isLoading,
  daily,
  userDaily,
}) => {
  const formatAnswer = (ans) => {
    if (ans.total === 0) { return '0%'; }

    const percent = ((ans.completed / ans.total) * 100);
    if (percent === 0) { return '0%'; }

    return percent.toFixed(0).toString() + '%';
  };

  if (isLoading) { return <Loader />; }

  if (!userDaily || !daily) {
    return (
      <View style={styles.percentageContainer}>
        <Text>No data found for this date...</Text>
      </View>
    );  
  }

  // TODO: loop here to DRY up
  return (
    <View style={styles.percentageContainer}>
      <View style={styles.promptRowFlexContainer}>
        <View style={styles.promptQuestionContainer}>
          <Text h4 style={{ color: '#3A3E98' }}>{daily.prompt1}</Text>
        </View>
        <View style={styles.promptAnswerContainer}>
          <View style={styles.answerPercentageContainer}>
            <Text style={styles.answerPercentage}>{formatAnswer(userDaily.ans1)}</Text>
          </View>
          <View style={styles.answerTotalContainer}>
            <Text>{`(${userDaily.ans1.total})`}</Text>
          </View>
        </View>
      </View>
      <View style={styles.promptRowFlexContainer}>
        <View style={styles.promptQuestionContainer}>
          <Text h4 style={{ color: '#5256BC' }}>{daily.prompt2}</Text>
        </View>
        <View style={styles.promptAnswerContainer}>
          <View style={styles.answerPercentageContainer}>
            <Text style={styles.answerPercentage}>{formatAnswer(userDaily.ans2)}</Text>
          </View>
          <View style={styles.answerTotalContainer}>
            <Text>{`(${userDaily.ans2.total})`}</Text>
          </View>
        </View>
      </View>
      <View style={styles.promptRowFlexContainer}>
        <View style={styles.promptQuestionContainer}>
          <Text h4 style={{ color: '#4AB1D8' }}>{daily.prompt3}</Text>
        </View>
        <View style={styles.promptAnswerContainer}>
          <View style={styles.answerPercentageContainer}>
            <Text style={styles.answerPercentage}>{formatAnswer(userDaily.ans3)}</Text>
          </View>
          <View style={styles.answerTotalContainer}>
            <Text>{`(${userDaily.ans3.total})`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

GlobalStatsSummary.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  daily: PropTypes.shape({
    prompt1: PropTypes.string.isRequired,
    prompt2: PropTypes.string.isRequired,
    prompt3: PropTypes.string.isRequired,
  }),
  userDaily: PropTypes.shape({
    ans1: PropTypes.shape({
      total: PropTypes.number.isRequired,
      completed: PropTypes.number.isRequired,
    }),
    ans2: PropTypes.shape({
      total: PropTypes.number.isRequired,
      completed: PropTypes.number.isRequired,
    }),
    ans3: PropTypes.shape({
      total: PropTypes.number.isRequired,
      completed: PropTypes.number.isRequired,
    }),
  }),
};

const styles = StyleSheet.create({
  percentageContainer: {
    flex: 3,
    flexDirection: 'column',
    padding: 30,
  },
  promptRowFlexContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  promptQuestionContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promptAnswerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  answerPercentage: {
    fontSize: 15,
  },
  answerPercentageContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  answerTotalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default GlobalStatsSummary;
