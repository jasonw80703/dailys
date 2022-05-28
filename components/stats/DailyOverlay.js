import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, Overlay } from '@rneui/base';
import Loader from '../shared/Loader';
import { StyleSheet } from 'react-native';

const DailyOverlay = ({
  isLoading,
  showModal,
  setShowModal,
  currentDaily,
  currentUserDaily,
}) => {
  if (isLoading) return <Loader />;

  return (
    <Overlay overlayStyle={styles.overlay} isVisible={showModal} onBackdropPress={() => setShowModal(!showModal)}>
      <Text>{currentUserDaily?.date}</Text>
      <Text>{currentDaily?.prompt1} - {currentUserDaily?.ans1?.toString()}</Text>
      <Text>{currentDaily?.prompt2} - {currentUserDaily?.ans2?.toString()}</Text>
      <Text>{currentDaily?.prompt3} - {currentUserDaily?.ans3?.toString()}</Text>
      <Button title='Close' onPress={() => setShowModal(!showModal)}/>
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
    height: 200,
  }
});

export default DailyOverlay;
