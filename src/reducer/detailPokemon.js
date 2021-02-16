import { POKEMONDETAIL } from '../actions/ActionTypes';

const initialState = {
  loading: false,
  detail: {
    name: ''
  }
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case POKEMONDETAIL.LOADING:
      return {
        ...state,
        loading: true
      };
    case POKEMONDETAIL.FETCH_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        detail: action.payload.data
      };
    case POKEMONDETAIL.FETCH_DETAIL_FAILED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
