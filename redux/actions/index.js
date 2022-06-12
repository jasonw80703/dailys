import { auth, db } from '../../firebase';
import {
  CLEAR_DATA,
  FETCH_USER_DAILYS,
  USER_LOADING,
  USER_STATE_CHANGE,
  USER_DAILYS_LOADING,
  FETCH_DAILYS,
  FETCH_DAILYS_LOADING,
  FETCH_DAILYS_ERROR,
  FETCH_USER_DAILYS_GLOBAL,
} from '../constants/index';
import sort from './sort';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

export const fetchUser = () => async dispatch => {
  await getDoc(doc(db, 'users', auth.currentUser.uid)).then((snapshot) => {
    // console.log(auth.currentUser.uid);
    if (snapshot.exists) {
      dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
    } else {
      console.log('User does not exist.');
    }
  });
};

export const setUserLoading = () => {
  return { type: USER_LOADING };
};

export const clearStore = () => {
  return { type: CLEAR_DATA };
};

export const fetchUserDailys = () => async dispatch => {
  const userDailysRef = collection(db, 'userdailys');
  const userDailysQuery = query(
    userDailysRef,
    where('userId', '==', auth.currentUser.uid),
  );
  const querySnapshot = await getDocs(userDailysQuery);
  const userDailys = [];
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      sort(userDailys, data, doc.id);
    });
  }
  dispatch({ type: FETCH_USER_DAILYS, data: userDailys });
};

export const setUserDailysLoading = () => {
  return { type: USER_DAILYS_LOADING };
};

export const fetchDailys = date => async dispatch => {
  const daily = await getDoc(doc(db, 'dailys', date));
  if (daily.exists()) {
    dispatch({ type: FETCH_DAILYS, data: daily.data(), date });
  } else {
    dispatch({ type: FETCH_DAILYS_ERROR, error: 'No Daily found for this date.' });
  }
};

export const setDailysLoading = () => {
  return { type: FETCH_DAILYS_LOADING };
};

export const fetchUserDailysByDate = date => async dispatch => {
  const userDailysRef = collection(db, 'userdailys');
  const userDailysQuery = query(
    userDailysRef,
    where('date', '==', date),
  );
  const querySnapshot = await getDocs(userDailysQuery);
  const userDailys = [];
  if (!querySnapshot.empty) {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      userDailys.push(data);
    });
  }
  dispatch({ type: FETCH_USER_DAILYS_GLOBAL, data: userDailys, date });
};