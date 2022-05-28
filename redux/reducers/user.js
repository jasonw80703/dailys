import { USER_LOADING, USER_STATE_CHANGE } from '../constants';

const initialState = {
  isLoading: false,
  currentUser: null,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
  case USER_LOADING:
    return {
      ...state,
      isLoading: true,
    };
  case USER_STATE_CHANGE:
    return {
      ...state,
      isLoading: false,
      currentUser: action.currentUser
    };
  default:
    return state;
  }
};
