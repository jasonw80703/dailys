import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');

  const onSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setDoc(doc(db, 'users', auth.currentUser.uid), {
          displayName,
          email,
        });
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <TextInput placeholder='display name' onChangeText={(displayName) => setDisplayName(displayName)} />
      <TextInput
        placeholder='email'
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder='password'
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title='Sign Up' onPress={() => onSignup()} />
    </View>
  );
};

export default Signup;
