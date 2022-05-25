import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/base';
import Loader from '../shared/Loader';
import { auth, db } from '../../firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

const HomeScreen = () => {
  const [daily, setDaily] = useState();
  const [userDaily, setUserDaily] = useState();
  // TODO: set unexpected error
  // const [error, setError] = useState('');
  const date = dayjs().format('YYYY-MM-DD');
  const uid = auth.currentUser.uid;

  const userDailysRef = collection(db, 'userdailys');
  const userDailysQuery = query(
    userDailysRef,
    where('userId', '==', uid),
    where('date', '==', date),
  );

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let isSubscribed = true;

    const fetchDaily = async () => {
      const snapshot = await getDoc((doc(db, 'dailys', date)));
      if (snapshot.exists) {
        setDaily(snapshot.data());
      } else {
        throw 'No Daily for today';
      }
    };

    fetchDaily()
      .catch(console.error); // TODO: set unexpected error

    return () => isSubscribed = false;
  }, [date]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let isSubscribed = true;

    const fetchUserDailys = async () => {
      const querySnapshot = await getDocs(userDailysQuery);
      if (querySnapshot.empty) {
        await addDoc(userDailysRef, {
          date: date,
          userId: uid,
          ans1: null,
          ans2: null,
          ans3: null,
        });

        setUserDaily({
          date,
          ans1: null,
          ans2: null,
          ans3: null,
        });
      } else {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          setUserDaily({
            date: date,
            ans1: data.ans1,
            ans2: data.ans2,
            ans3: data.ans3,
          });
        });
      }
    };

    fetchUserDailys()
      .catch(console.error); // TODO: set unexpected error

    return () => isSubscribed = false;
  }, [uid]);

  if (!userDaily) { return <Loader />; }

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateHeader}>Dailys</Text>
        <Text style={styles.dateText}>{userDaily.date}</Text>
      </View>
      <View style={styles.promptContainer}>
        <Text style={styles.promptHeader}>On this day, I ...</Text>
        <View style={styles.promptContainerLeft}>
          <View style={styles.promptRowFlexContainer}>
            <View style={styles.promptQuestionContainer}>
              <Text>{daily.prompt1}</Text>
            </View>
            <View style={styles.promptAnswerContainer}>
              <Text>{userDaily.ans1?.toString()}Yes</Text>
            </View>
          </View>
          <View style={styles.promptRowFlexContainer}>
            <View style={styles.promptQuestionContainer}>
              <Text>{daily.prompt2}</Text>
            </View>
            <View style={styles.promptAnswerContainer}>
              <Text>{userDaily.ans2?.toString()}Yes</Text>
            </View>
          </View>
          <View style={styles.promptRowFlexContainer}>
            <View style={styles.promptQuestionContainer}>
              <Text>{daily.prompt3}</Text>
            </View>
            <View style={styles.promptAnswerContainer}>
              <Text>{userDaily.ans3?.toString()}Yes</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    flexDirection: 'column',
  },
  // Date stuff
  dateContainer: {
    flex: 1,
  },
  dateHeader: {
    fontSize: 40,
  },
  dateText: {
    fontSize: 30,
  },
  // Prompt stuff
  promptContainer: {
    flex: 4,
  },
  promptHeader: {
    fontSize: 20,
    fontStyle: 'italic',
    paddingBottom: 30,
  },
  promptContainerLeft: {
    flex: 2,
    flexDirection: 'column',
  },
  promptRowFlexContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  promptQuestionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promptAnswerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default HomeScreen;