import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import PropTypes from 'prop-types';

const LaunchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>DAILYS</Text>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.buttonText}>Signup</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: '#339CFF',
    marginBottom: 5,
    width: 100
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

LaunchScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
};

export default LaunchScreen;
