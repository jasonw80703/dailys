import React from 'react';
import { formatDistance } from 'date-fns';
import Spacer from '../shared/Spacer';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Text } from '@rneui/base';
import { View, StyleSheet } from 'react-native';
import { clearStore } from '../../redux/actions/index';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

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
        <Text>Email: {user.email}</Text>
        <Text>User since: {formatDistance(new Date(user.createdAt), new Date(), { addSuffix: true })}</Text>
      </View>
      <Spacer size='md' />
      <View style={styles.cardContainer}>
        <Card>
          <Card.Title><Text>What is Dailys?</Text></Card.Title>
          <Card.Divider />
          <Text style={styles.blurb}>The purpose of Dailys is to humanize us. No matter where you are in the world, you experience similar things with someone thousands of miles away. You think in similar ways, feel in similar ways, and do similar things every day.</Text>
          <Text>At the end of the day, we are all human.</Text>
        </Card>
      </View>
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
    paddingTop: 80,
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
  },
  cardContainer: {
    flex: 1,
  },
  blurb: {
    paddingBottom: 30,
  },
});

export default ProfileScreen;
