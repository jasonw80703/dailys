import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

const SizeMapping = {
  'sm': 80,
  'md': 40,
  'lg': 17,
  'full': 0,
};

const HorizontalRule = ({ color, size }) => {
  return (
    <View
      style={{
        borderBottomColor: color,
        borderBottomWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: SizeMapping[size],
        marginRight: SizeMapping[size],
      }}
    />
  );
};

HorizontalRule.defaultProps = {
  color: 'black',
  size: 'md',
};

HorizontalRule.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'full']),
};

export default HorizontalRule;
