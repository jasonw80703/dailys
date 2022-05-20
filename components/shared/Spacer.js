import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const SizeMapping = {
  'sm': 3,
  'md': 6,
  'lg': 9,
};

const Spacer = ({ size }) => {
  const amt = SizeMapping[size];
  return <View style={{ padding: amt }}></View>;
};

Spacer.defaultProps = {
  size: 'md'
};

Spacer.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Spacer;
