import { auth, db } from '../../firebase';
import { CLEAR_DATA, FETCH_USER_DAILYS, IS_LOADING, USER_STATE_CHANGE } from '../constants/index';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

export const fetchUser = () => {
  return (dispatch) => {
    getDoc(doc(db, 'users', auth.currentUser.uid)).then((snapshot) => {
      // console.log(auth.currentUser.uid);
      if (snapshot.exists) {
        dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
      } else {
        console.log('User does not exist.');
      }
    });
  };
};

export const setLoading = () => {
  return (dispatch) => {
    dispatch({ type: IS_LOADING });
  };
};

export const clearStore = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_DATA });
  };
};

export const fetchUserDailys = () => {
  return async (dispatch) => {
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
        userDailys.push({
          id: doc.id,
          date: data.date,
          ans1: data.ans1,
          ans2: data.ans2,
          ans3: data.ans3,
        });
      });
    }
    dispatch({ type: FETCH_USER_DAILYS, data: userDailys });
  };
};