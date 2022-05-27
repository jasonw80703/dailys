import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text } from '@rneui/base';
import { View } from 'react-native';

const useForceUpdate = () => {
  // eslint-disable-next-line no-unused-vars
  const [value, setValue] = useState(0);
  return () => setValue(value => value + 1);
};

const StatsScreen = ({ navigation }) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    // This is for being able to render every time we click on the tab
    const unsubscribe = navigation.addListener('tabPress', () => {
      forceUpdate();
    });

    return unsubscribe;
  }, [navigation]);

  console.log('render');
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Stats Page</Text>
    </View>
  );
};

StatsScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default StatsScreen;