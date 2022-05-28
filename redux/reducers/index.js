import { combineReducers } from 'redux';
import { user } from './user';
import { userDailys } from './userDailys';
import { dailys } from './dailys';

const reducers = combineReducers({
  userState: user,
  userDailysState: userDailys,
  dailysState: dailys,
});

export default reducers;
