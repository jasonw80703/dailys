import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import { View, Text } from 'react-native';
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

  const userDailysRef = collection(db, 'userdailys');
  const userDailysQuery = query(
    userDailysRef,
    where('userId', '==', auth.currentUser.uid),
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
          userId: auth.currentUser.uid,
          ans1: null,
          ans2: null,
          ans3: null,
        });

        setUserDaily({
          date: date,
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
  }, [auth.currentUser.uid]);

  if (!userDaily) { return <Loader />; }

  // TODO: answers can be null
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>{userDaily.date}</Text>
      <Text>{daily.prompt1}</Text>
      <Text>{userDaily.ans1?.toString()}</Text>
      <Text>{daily.prompt2}</Text>
      <Text>{userDaily.ans2?.toString()}</Text>
      <Text>{daily.prompt3}</Text>
      <Text>{userDaily.ans3?.toString()}</Text>
    </View>
  );
};

export default HomeScreen;