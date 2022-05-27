import { combineReducers } from 'redux';
import { user } from './user';
import { userDailys } from './userDailys';

const reducers = combineReducers({
  userState: user,
  userDailysState: userDailys,
});

export default reducers;
