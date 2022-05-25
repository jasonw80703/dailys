import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup, Text } from '@rneui/base';
import Loader from '../shared/Loader';
import { auth, db } from '../../firebase';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

const COMPLETE = '✓';
const INCOMPLETE = '✕';

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

  const updateAnswer = async (ans, val) => {
    const update = {};
    const result = val === 0 ? true : false;
    if (result !== userDaily[ans]) { // perform only if changed
      update[ans] = result;
      await updateDoc(doc(db, 'userdailys', userDaily.id), update);
      setUserDaily((prevState) => ({
        ...prevState,
        [ans]: result,
      }));
    }
  };

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
        const docRef = await addDoc(userDailysRef, {
          date: date,
          userId: uid,
          ans1: null,
          ans2: null,
          ans3: null,
        });

        setUserDaily({
          id: docRef.id,
          date,
          ans1: null,
          ans2: null,
          ans3: null,
        });
      } else {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setUserDaily({
            id: doc.id,
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
              <Text h4 style={[styles.promptQuestionText, { color: '#3A3E98' }]}>{daily.prompt1}</Text>
            </View>
            <View style={styles.promptAnswerContainer}>
              <ButtonGroup
                buttonStyle={{ width: 40 }}
                selectedButtonStyle={{ backgroundColor: userDaily.ans1 ? '#4BB153' : '#F47174' }}
                buttons={[COMPLETE, INCOMPLETE]}
                onPress={(val) => updateAnswer('ans1', val)}
                selectedIndex={
                  userDaily.ans1 === null ? null : userDaily.ans1 ? 0 : 1
                }
              />
            </View>
          </View>
          <View style={styles.promptRowFlexContainer}>
            <View style={styles.promptQuestionContainer}>
              <Text h4 style={[styles.promptQuestionText, { color: '#5256BC' }]}>{daily.prompt2}</Text>
            </View>
            <View style={styles.promptAnswerContainer}>
              <ButtonGroup
                buttonStyle={{ width: 40 }}
                selectedButtonStyle={{ backgroundColor: userDaily.ans2 ? '#4BB153' : '#F47174' }}
                buttons={[COMPLETE, INCOMPLETE]}
                onPress={(val) => updateAnswer('ans2', val)}
                selectedIndex={
                  userDaily.ans2 === null ? null : userDaily.ans2 ? 0 : 1
                }
              />
            </View>
          </View>
          <View style={styles.promptRowFlexContainer}>
            <View style={styles.promptQuestionContainer}>
              <Text h4 style={[styles.promptQuestionText, { color: '#4AB1D8' }]}>{daily.prompt3}</Text>
            </View>
            <View style={styles.promptAnswerContainer}>
              <ButtonGroup
                buttonStyle={{ width: 40 }}
                selectedButtonStyle={{ backgroundColor: userDaily.ans3 ? '#4BB153' : '#F47174' }}
                buttons={[COMPLETE, INCOMPLETE]}
                onPress={(val) => updateAnswer('ans3', val)}
                selectedIndex={
                  userDaily.ans3 === null ? null : userDaily.ans3 ? 0 : 1
                }
              />
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
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promptAnswerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  promptQuestionText: {
    // maybe something later
  },
});

export default HomeScreen;