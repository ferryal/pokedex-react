import { LISTPOKEMON } from '../actions/ActionTypes';

const initialState = {
  loading: false,
  listPokemon: {},
  pokemon: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LISTPOKEMON.LOADING:
      return {
        ...state,
        loading: true
      };
    case LISTPOKEMON.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
				listPokemon: action.payload.data.results
      };
    case LISTPOKEMON.FETCH_FAILED:
      return {
        ...state,
        loading: false
      };
    case LISTPOKEMON.FETCH_IMAGE_SUCCESS:
      return {
        ...state,
        pokemon: [...state.pokemon, action.payload.data]
      };
    default:
      return state;
  }
};
