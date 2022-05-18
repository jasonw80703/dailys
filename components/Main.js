import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from 'react-native';
import { fetchUser } from '../redux/actions/index';

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.currentUser);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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
    </View>
  );
};

export default Main;
