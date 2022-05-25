import React from 'react';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Spacer from '../shared/Spacer';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text } from '@rneui/base';
import { View, StyleSheet } from 'react-native';
import { clearStore } from '../../redux/actions/index';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

dayjs.extend(relativeTime);

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.currentUser);

  const onLogout = () => {
    signOut(auth).then(() => {
      dispatch(clearStore());
    });
  };

  return (
    <View style={styles.baseView}>
      <View>
        <Text style={styles.nameText}>Hi {user.displayName}!</Text>
      </View>
      <Spacer size='md' />
      <View style={styles.infoView}>
        <Text><b>Email:</b> {user.email}</Text>
        <Text><b>User since:</b> {dayjs(user.createdAt).fromNow()}</Text>
      </View>
      <Spacer size='md' />
      <View style={styles.logoutButton}>
        <Button title='Logout' onPress={() => onLogout()}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baseView: {
    flex: 1,
    padding: 20,
  },
  infoView: {
    justifyContent: 'center',
    // alignItems: 'center',
  },
  nameText: {
    fontSize: 40,
  },
  logoutButton: {
    flex: 1,
    justifyContent: 'flex-end',
  }
});

export default ProfileScreen;
