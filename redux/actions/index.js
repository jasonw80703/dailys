import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { CLEAR_DATA, USER_STATE_CHANGE } from '../constants/index';

export const fetchUser = () => {
  return (dispatch) => {
    getDoc(doc(db, 'users', auth.currentUser.uid)).then((snapshot) => {
      if (snapshot.exists) {
        console.log(snapshot.data());
        dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
      } else {
        console.log('User does not exist.');
      }
    });
  };
};

export const clearStore = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_DATA });
  };
};