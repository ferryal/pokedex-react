import { combineReducers } from 'redux';
import { reducer as listPokemon } from './reducer/listPokemon';
import { reducer as detailPokemon } from './reducer/detailPokemon';
import { reducer as myPokemon } from './reducer/myPokemon';

export default combineReducers({
  listPokemon,
  detailPokemon,
  myPokemon,
});
