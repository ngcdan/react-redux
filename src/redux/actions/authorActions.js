import * as types from './actionTypes';
import { getAuthors } from '../../api/authorApi';
import { beginApiCall } from './apiStatusAction';

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return getAuthors().then((authors) => {
      dispatch({ type: types.LOAD_AUTHORS_SUCCESS, authors });
    }).catch((err) => {
      throw err;
    });
  }
}