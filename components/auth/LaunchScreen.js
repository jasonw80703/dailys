import React from 'react';
import { Button, Text } from '@rneui/base';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const LaunchScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>DAILYS</Text>
      <Button title='Login' buttonStyle={styles.loginButton} titleStyle={styles.loginButtonText} onPress={() => navigation.navigate('Login')} />
      <Button title='Signup' buttonStyle={styles.signUpButton} type='outline' titleStyle={styles.signUpButtonText} onPress={() => navigation.navigate('Signup')} />
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
  loginButton: {
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
  loginButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  signUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    marginBottom: 5,
    width: 100
  },
  signUpButtonText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
  },
});

LaunchScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
};

export default LaunchScreen;
