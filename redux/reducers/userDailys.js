import { FETCH_USER_DAILYS, USER_DAILYS_LOADING } from '../constants';

const initialState = {
  isLoading: false,
  userDailys: [],
};

export const userDailys = (state = initialState, action) => {
  switch (action.type) {
  case USER_DAILYS_LOADING:
    return {
      ...state,
      isLoading: true,
    };
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