import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { fetchUser, clearStore } from '../redux/actions/index';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.currentUser);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const onLogout = () => {
    signOut(auth).then(() => {
      dispatch(clearStore());
    });
  };

  if (!user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Hi {user.name}!</Text>
      <Button title='Logout' onPress={() => onLogout()}/>
    </View>
  );
};

export default Main;
