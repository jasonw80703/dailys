import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Platform, View, StyleSheet } from 'react-native';
import { Text } from '@rneui/base';
import Loader from '../shared/Loader';
import { auth, db } from '../../firebase';
import Prompt from './Prompt';
import { DAILY_DATE_FORMAT } from '../../constants/dates';
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

const HomeScreen = () => {
  const [daily, setDaily] = useState();
  const [userDaily, setUserDaily] = useState();
  const [error, setError] = useState('');
  const date = format(new Date(), DAILY_DATE_FORMAT);
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
        if (isSubscribed) {
          setDaily(snapshot.data());
        }
      } else {
        throw 'No Daily for today';
      }
    };

    fetchDaily()
      .catch(err => {
        setError(err);
      });

    return () => { isSubscribed = false; };
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

        if (isSubscribed) {
          setUserDaily({
            id: docRef.id,
            date,
            ans1: null,
            ans2: null,
            ans3: null,
          });
        }
      } else {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (isSubscribed) {
            setUserDaily({
              id: doc.id,
              date: date,
              ans1: data.ans1,
              ans2: data.ans2,
              ans3: data.ans3,
            });
          }
        });
      }
    };

    fetchUserDailys()
      .catch(err => {
        setError(err);
      });

    return () => { isSubscribed = false; };
  }, [uid]);

  if (!userDaily) { return <Loader />; }

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateHeader}>Dailys</Text>
          <Text style={styles.dateText}>{userDaily.date}</Text>
        </View>
        <View style={styles.promptContainer}>
          <Text>Unexpected error: {error}. Please restart the application.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateHeader}>Dailys</Text>
        <Text style={styles.dateText}>{userDaily.date}</Text>
      </View>
      <View style={styles.promptContainer}>
        <Text style={styles.promptHeader}>On this day, I ...</Text>
        <View style={styles.promptContainerLeft}>
          <Prompt
            promptQuestionColor='#3A3E98'
            prompt={daily.prompt1}
            answer={userDaily.ans1}
            answerNumber={'ans1'}
            updateAnswer={updateAnswer}
          />
          <Prompt
            promptQuestionColor='#5256BC'
            prompt={daily.prompt2}
            answer={userDaily.ans2}
            answerNumber={'ans2'}
            updateAnswer={updateAnswer}
          />
          <Prompt
            promptQuestionColor='#4AB1D8'
            prompt={daily.prompt3}
            answer={userDaily.ans3}
            answerNumber={'ans3'}
            updateAnswer={updateAnswer}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: Platform.OS === 'android' ? 70 : 50,
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
});

export default HomeScreen;