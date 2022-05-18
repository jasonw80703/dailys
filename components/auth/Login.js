import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <TextInput
        placeholder='email'
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder='password'
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title='Login' onPress={() => onLogin()} />
    </View>
  );
};

export default Login;
