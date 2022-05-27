import { FETCH_USER_DAILYS } from '../constants';

const initialState = {
  isLoading: false,
  userDailys: [],
};

export const userDailys = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_USER_DAILYS:
    return {
      ...state,
      isLoading: false,
      userDailys: action.data
    };
  default:
    return state;
  }
};