import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button, Text } from '@rneui/base';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import HorizontalRule from '../shared/HorizontalRule';
import formStyles from './styles';

const ForgotPassword = () => {
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
    }
  });

  const resetPassword = ({ email }) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetError('');
        setResetSuccess(true);
      })
      .catch((error) => {
        setResetSuccess(false);
        setResetError(error.message);
      });
  };

  return (
    <View style={styles.mainContainer}>
      {
        !!resetError && (
          <View style={formStyles.submitErrorView}>
            <Text style={formStyles.submitErrorText}>Unexpected error logging in: {resetError}</Text>
          </View>
        )
      }
      {
        !!resetSuccess && (
          <View style={styles.submitSuccessView}>
            <Text style={styles.submitSuccessText}>Reset password email sent!</Text>
          </View>
        )
      }
      <View>
        <Text>Provide your email to reset your password. We will send out an email to reset it!</Text>
      </View>
      <HorizontalRule size='full' />
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

      {errors.email &&
        <View style={formStyles.validationView}>
          <Text style={formStyles.validationText}>{errors.email?.message}</Text>
        </View>
      }

      <View style={formStyles.submitButton}>
        <Button title='Reset Password' onPress={handleSubmit(resetPassword)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  submitSuccessView: {
    backgroundColor: 'green',
    padding: 8,
    margin: 6,
    borderRadius: 10,
  },
  submitSuccessText: {
    color: 'white',
    fontWeight: 'bold',
  }
});

export default ForgotPassword;
