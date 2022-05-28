import React from 'react';
import PropTypes from 'prop-types';
import { Button, Text, Overlay } from '@rneui/base';
import { View, StyleSheet } from 'react-native';
import Loader from '../shared/Loader';
import HorizontalRule from '../shared/HorizontalRule';
import { COMPLETE, INCOMPLETE, NOT_DONE } from '../../constants/icons';

const getIcon = (ans) => {
  if (ans === null) {
    return <span style={{ color: 'gray' }}>{NOT_DONE}</span>;
  }

  return ans ?
    <span style={{ color: 'green' }}>{COMPLETE}</span> :
    <span style={{ color: 'red' }}>{INCOMPLETE}</span>;
};

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
      <Text h4>{currentUserDaily?.date}</Text>
      <HorizontalRule size='full' />
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text style={{ flex: 3 }}>{currentDaily?.prompt1}</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text>{getIcon(currentUserDaily?.ans1)}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text style={{ flex: 3 }}>{currentDaily?.prompt2}</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text>{getIcon(currentUserDaily?.ans2)}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text style={{ flex: 3 }}>{currentDaily?.prompt3}</Text>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text>{getIcon(currentUserDaily?.ans3)}</Text>
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
    height: 200,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  }
});

export default DailyOverlay;
