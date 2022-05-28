import { FETCH_DAILYS, FETCH_DAILYS_LOADING } from '../constants';

const initialState = {
  isLoading: false,
  error: null,
  dailys: {},
};

// TODO: add error state
export const dailys = (state = initialState, action) => {
  switch(action.type) {
  case FETCH_DAILYS_LOADING:
    return {
      ...state,
      isLoading: true,
    };
  case FETCH_DAILYS:
    return {
      ...state,
      isLoading: false,
      dailys: {...state.dailys, [action.date]: action.data },
    };
  default:
    return state;
  }
};