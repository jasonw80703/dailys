import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Text } from '@rneui/base';
import { View, StyleSheet } from 'react-native';
import { COMPLETE, INCOMPLETE } from '../../constants/icons';

const Prompt = ({
  promptQuestionColor,
  prompt,
  answer,
  answerNumber,
  updateAnswer,
}) => {
  return (
    <View style={styles.promptRowFlexContainer}>
      <View style={styles.promptQuestionContainer}>
        <Text h4 style={{ color: promptQuestionColor }}>{prompt}</Text>
      </View>
      <View style={styles.promptAnswerContainer}>
        <ButtonGroup
          buttonStyle={styles.buttonGroupStyle}
          selectedButtonStyle={{ backgroundColor: answer ? '#4BB153' : '#F47174' }}
          buttons={[COMPLETE, INCOMPLETE]}
          onPress={(val) => updateAnswer(answerNumber, val)}
          selectedIndex={
            answer === null ? null : answer ? 0 : 1
          }
        />
      </View>
    </View>
  );
};

Prompt.propTypes = {
  promptQuestionColor: PropTypes.string.isRequired,
  prompt: PropTypes.string.isRequired,
  answer: PropTypes.bool,
  answerNumber: PropTypes.string.isRequired,
  updateAnswer: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
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
  buttonGroupStyle: {
    width: 40,
  },
});

export default Prompt;
