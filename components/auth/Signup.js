import React, { useState } from 'react';
import * as dayjs from 'dayjs';
import { Button, Text } from '@rneui/base';
import { View, TextInput, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import HorizontalRule from '../shared/HorizontalRule';
import formStyles from './styles';

const Signup = () => {
  const [submitError, setSubmitError] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      displayName: '',
    }
  });

  const onSignup = async ({ email, password, displayName }) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        writeToFirestore(email, displayName);
      })
      .catch((error) => {
        setSubmitError(error.toString());
      });
  };

  const writeToFirestore = async (email, displayName) => {
    try {
      setDoc(doc(db, 'users', auth.currentUser.uid), {
        displayName: displayName,
        email: email,
        createdAt: dayjs().format(),
      });
    } catch (error) {
      setSubmitError(error.toString());
    }
  };

  return (
    <View style={styles.mainContainer}>
      {
        !!submitError && (
          <View style={formStyles.submitErrorView}>
            <Text style={formStyles.submitErrorText}>Unexpected error signing up: {submitError}</Text>
          </View>
        )
      }
      <Controller
        control={control}
        rules={{
          required: 'Display name is required',
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            placeholder='display name'
            onChangeText={onChange}
            value={value}
            style={formStyles.formInput}
          />
        )}
        name='displayName'
      />
      <Controller
        control={control}
        rules={{
          required: 'Email Address is required',
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: 'Email address format is incorrect'
          }
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
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: 'Password must be at least 8 characters with one letter and one number'
          }
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

      {errors.displayName &&
        <View style={formStyles.validationView}>
          <Text style={formStyles.validationText}>{errors.displayName?.message}</Text>
        </View>
      }
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

      <View style={formStyles.submitButton}>
        <Button title='Sign Up' onPress={handleSubmit(onSignup)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
  }
});

export default Signup;
