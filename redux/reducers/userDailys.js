import {
  FETCH_USER_DAILYS,
  USER_DAILYS_LOADING,
  FETCH_USER_DAILYS_GLOBAL,
} from '../constants';

const initialState = {
  isLoading: false,
  userDailys: [],
  globalUserDailys: {},
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
  case FETCH_USER_DAILYS_GLOBAL: {
    const set = action.data;
    const result = {
      ans1: {
        completed: 0,
        total: 0,
      },
      ans2: {
        completed: 0,
        total: 0,
      },
      ans3: {
        completed: 0,
        total: 0,
      }
    };

    set.forEach(userDaily => {
      ['ans1', 'ans2', 'ans3'].forEach(ans => {
        if (userDaily[ans] === null) {
          return;
        }
        if (userDaily[ans]) {
          result[ans].completed++;
        }
        result[ans].total++;
      });
    });

    return {
      ...state,
      isLoading: false,
      globalUserDailys: {...state.globalUserDailys, [action.date]: result }
    };
  }
  default:
    return state;
  }
};