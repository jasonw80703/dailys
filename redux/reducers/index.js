import { combineReducers } from 'redux';
import { CLEAR_DATA } from '../constants';
import { user } from './user';
import { userDailys } from './userDailys';
import { dailys } from './dailys';

const reducers = combineReducers({
  userState: user,
  userDailysState: userDailys,
  dailysState: dailys,
});

const rootReducer = (state, action) => {
  if (action.type === CLEAR_DATA) {
    return reducers(undefined, action);
  }

  return reducers(state, action);
};

export default rootReducer;
