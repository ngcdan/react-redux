import * as types from './actionTypes';
import { getAuthors } from '../../api/authorApi';

export function loadAuthors() {
  return function (dispatch) {
    return getAuthors().then((authors) => {
      dispatch({ type: types.LOAD_AUTHORS_SUCCESS, authors });
    }).catch((err) => {
      throw err;
    });
  }
}