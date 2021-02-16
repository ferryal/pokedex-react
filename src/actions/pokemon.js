import axios from 'axios';
import config from '../config';
import { LISTPOKEMON, POKEMONDETAIL, MYPOKEMON } from './ActionTypes';


function loading() {
  return {
    type: LISTPOKEMON.LOADING
  };
}

function fetchSuccess(data) {
  return {
    type: LISTPOKEMON.FETCH_SUCCESS,
    payload: { data }
  };
}

function fetchFailed() {
  return {
    type: LISTPOKEMON.FETCH_FAILED
  };
}

function fetchSuccessDetail(data) {
  return {
    type: POKEMONDETAIL.FETCH_DETAIL_SUCCESS,
    payload: {data}
  };
}

function fetchFailedDetail() {
  return {
    type: POKEMONDETAIL.FETCH_DETAIL_FAILED
  }
}

function fetchSuccessMyPokemon(data) {
  return {
    type: MYPOKEMON.FETCH_SUCCESS,
    payload: data
  }
}

function fetchAddPokemon(data) {
  return {
    type: POKEMONDETAIL.FETCH_ADD_POKEMON,
    payload: data
  }
}

function removePokemon(id) {
  return {
    type: MYPOKEMON.REMOVE_POKEMON,
    payload: id
  }
}

function fetchSuccessImage(data) {
  return {
    type: LISTPOKEMON.FETCH_IMAGE_SUCCESS,
    payload: {
      data
    }
  };
}

function fetchFailedImage(data) {
  return {
    type: LISTPOKEMON.FETCH_IMAGE_FAILED,
    payload: {
      data
    }
  };
}

export function fetchListPokemon(start, count) {
  return (dispatch) => {
    dispatch(loading());
    axios.get(`${config.apiUrl}/v2/pokemon?offset=${start}&limit=${count}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.status === 200) {
        const response = res.data;
        dispatch(fetchSuccess(response));
        for (let i = 0; i < response.results.length; i++) {
          const data = response.results[i];
          axios.get(`${data.url}`, {
            headers: {
              'Content-Type': 'application/json',
            }
          }).then((res) => {
            if (res.status === 200) {
              const response = res.data;
              dispatch(fetchSuccessImage(response));
            } else {
              dispatch(fetchFailedImage());
            }
          }).catch(() => {
            dispatch(fetchFailedImage());
          });
        }
      } else {
        dispatch(fetchFailed());
      }
    }).catch(() => {
      dispatch(fetchFailed());
    });
  };
}
