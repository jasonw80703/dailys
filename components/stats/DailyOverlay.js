import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, Overlay } from '@rneui/base';
import { Platform, View, StyleSheet } from 'react-native';
import Loader from '../shared/Loader';
import HorizontalRule from '../shared/HorizontalRule';
import { COMPLETE, INCOMPLETE, NOT_DONE } from '../../constants/icons';

const getIcon = (ans) => {
  if (ans === null) {
    return <Text style={{ color: 'gray' }}>{NOT_DONE}</Text>;
  }

  return ans ?
    <Text style={{ color: 'green' }}>{COMPLETE}</Text> :
    <Text style={{ color: 'red' }}>{INCOMPLETE}</Text>;
};

const DailyOverlay = ({
  isLoading,
  showModal,
  setShowModal,
  currentDaily,
  currentUserDaily,
}) => {
  if (isLoading) return <Loader />;

  if (!currentDaily) {
    return (
      <Overlay overlayStyle={styles.overlay} isVisible={showModal} onBackdropPress={() => setShowModal(!showModal)}>
        <Text h4>{currentUserDaily?.date}</Text>
        <HorizontalRule size='full' />
        <View style={{ flex: 1 }}>
          <Text>No data</Text>
        </View>
      </Overlay>
    );
  }

  return (
    <Overlay overlayStyle={styles.overlay} isVisible={showModal} onBackdropPress={() => setShowModal(!showModal)}>
      <Text h4>{currentUserDaily?.date}</Text>
      <HorizontalRule size='full' />
      <View style={styles.promptRow}>
        <Text style={styles.promptRowText}>{currentDaily?.prompt1}</Text>
        <View style={styles.promptRowIcon}>
          {getIcon(currentUserDaily?.ans1)}
        </View>
      </View>
      <View style={styles.promptRow}>
        <Text style={styles.promptRowText}>{currentDaily?.prompt2}</Text>
        <View style={styles.promptRowIcon}>
          {getIcon(currentUserDaily?.ans2)}
        </View>
      </View>
      <View style={styles.promptRow}>
        <Text style={styles.promptRowText}>{currentDaily?.prompt3}</Text>
        <View style={styles.promptRowIcon}>
          {getIcon(currentUserDaily?.ans3)}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title='Close' onPress={() => setShowModal(!showModal)}/>
      </View>
    </Overlay>
  );
};

DailyOverlay.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  currentDaily: PropTypes.objectOf(PropTypes.string),
  currentUserDaily: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    ans1: PropTypes.bool,
    ans2: PropTypes.bool,
    ans3: PropTypes.bool,
  }),
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'white',
    width: 300,
    height: Platform.OS === 'android' ? 230 : 200,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  promptRow: {
    flex: 1,
    flexDirection: 'row',
  },
  promptRowText: {
    flex: 3,
  },
  promptRowIcon: {
    flex: 1,
    alignItems: 'flex-end',
  }
});

export default DailyOverlay;
