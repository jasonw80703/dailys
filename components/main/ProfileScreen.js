import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { clearStore } from '../../redux/actions/index';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    signOut(auth).then(() => {
      dispatch(clearStore());
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Profile</Text>
      <Button title='Logout' onPress={() => onLogout()}/>
    </View>
  );
};

export default ProfileScreen;
