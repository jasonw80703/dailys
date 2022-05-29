import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button, Text } from '@rneui/base';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm, Controller } from 'react-hook-form';

import HorizontalRule from '../shared/HorizontalRule';
import formStyles from './styles';

const Login = ({ navigation }) => {
  const [submitError, setSubmitError] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onLogin = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        setSubmitError(error.toString());
      });
  };

  return (
    <View style={styles.mainContainer}>
      {
        !!submitError && (
          <View style={formStyles.submitErrorView}>
            <Text style={formStyles.submitErrorText}>Unexpected error logging in: {submitError}</Text>
          </View>
        )
      }
      <Controller
        control={control}
        rules={{
          required: 'Email is required',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            placeholder='email'
            onChangeText={onChange}
            value={value}
            style={formStyles.formInput}
          />
        )}
        name='email'
      />
      <Controller
        control={control}
        rules={{
          required: 'Password is required',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            placeholder='password'
            onChangeText={onChange}
            value={value}
            secureTextEntry={true}
            style={formStyles.formInput}
          />
        )}
        name='password'
      />

      <HorizontalRule size='lg' />

      {errors.email &&
        <View style={formStyles.validationView}>
          <Text style={formStyles.validationText}>{errors.email?.message}</Text>
        </View>
      }
      {errors.password &&
        <View style={formStyles.validationView}>
          <Text style={formStyles.validationText}>{errors.password?.message}</Text>
        </View>
      }

      <View style={styles.forgotPasswordContainer}>
        <Button
          type='clear'
          title='Forgot your password?'
          titleStyle={styles.forgotPasswordLink}
          onPress={() => navigation.navigate('ForgotPassword')}
        />
      </View>

      <View style={formStyles.submitButton}>
        <Button title='Login' onPress={handleSubmit(onLogin)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
  },
  forgotPasswordLink: {
    fontSize: 12,
  },
});

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }),
};

export default Login;
