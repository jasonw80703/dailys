import { FETCH_DAILYS, FETCH_DAILYS_ERROR, FETCH_DAILYS_LOADING } from '../constants';

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
  case FETCH_DAILYS_ERROR:
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  default:
    return state;
  }
};