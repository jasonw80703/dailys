import React, { useState } from 'react';
import { View, Button, TextInput, Text } from 'react-native';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm, Controller } from 'react-hook-form';

import HorizontalRule from '../shared/HorizontalRule';
import styles from './styles';

const Login = () => {
  const [submitError, setSubmitError] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onLogin = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        setSubmitError(error.toString());
      });
  };

  return (
    <View>
      {
        !!submitError && (
          <View style={styles.submitErrorView}>
            <Text style={styles.submitErrorText}>Unexpected error logging in: {submitError}</Text>
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
            style={styles.formInput}
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
            style={styles.formInput}
          />
        )}
        name='password'
      />

      <HorizontalRule size='lg' />

      {errors.email &&
        <View style={styles.validationView}>
          <Text style={styles.validationText}>{errors.email?.message}</Text>
        </View>
      }
      {errors.password &&
        <View style={styles.validationView}>
          <Text style={styles.validationText}>{errors.password?.message}</Text>
        </View>
      }

      <View style={styles.submitButton}>
        <Button title='Login' onPress={handleSubmit(onLogin)} />
      </View>
    </View>
  );
};

export default Login;
