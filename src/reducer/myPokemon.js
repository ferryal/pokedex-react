import { MYPOKEMON } from '../actions/ActionTypes';

const initialState = {
  myPokemon: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
  case MYPOKEMON.FETCH_SUCCESS:
    return {
      ...state, myPokemon: [...state.myPokemon, action.payload],
    };
  case MYPOKEMON.REMOVE_POKEMON:
    return {
      ...state, myPokemon: [...state.myPokemon.filter((item, index) => index !== action.payload)],
    };
  default:
    return state;
  }
};
