import React, { useState } from 'react';
import * as dayjs from 'dayjs';
import { View, Button, TextInput, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

// Firebase stuff
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import HorizontalRule from '../shared/HorizontalRule';

const Signup = () => {
  const [submitError, setSubmitError] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      displayName: '',
    }
  });

  const onSignup = ({ email, password, displayName }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setDoc(doc(db, 'users', auth.currentUser.uid), {
          displayName: displayName,
          email: email,
          createdAt: dayjs().format(),
        });
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
            <Text style={styles.submitErrorText}>Unexpected error signing up: {submitError}</Text>
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
            style={styles.formInput}
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
            style={styles.formInput}
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
            style={styles.formInput}
          />
        )}
        name='password'
      />

      <HorizontalRule size='lg' />

      {errors.displayName &&
        <View style={styles.validationView}>
          <Text style={styles.validationText}>{errors.displayName?.message}</Text>
        </View>
      }
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

      <View style={styles.signUpButton}>
        <Button title='Sign Up' onPress={handleSubmit(onSignup)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  validationView: {
    marginLeft: 6,
    marginRight: 6,
    marginBottom: 3,
  },
  validationText: {
    color: 'red',
  },
  signUpButton: {
    margin: 15,
  },
  formInput: {
    margin: 6,
  },
  submitErrorView: {
    backgroundColor: '#F25050',
    padding: 8,
    margin: 6,
    borderRadius: 10,
  },
  submitErrorText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default Signup;
