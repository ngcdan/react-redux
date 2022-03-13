import * as types from './actionTypes';
import { beginApiCall } from './apiStatusAction';
import { rest } from '../../api';

export function loadAuthors(successCb, failCb) {
  return function (dispatch) {
    dispatch(beginApiCall());
    rest.get("authors", null, (authors) => {
      console.log(authors);
      if (successCb) successCb(authors);
      dispatch({ type: types.LOAD_AUTHORS_SUCCESS, authors });
    }, (err) => {
      if (failCb) failCb(err);
      dispatch(apiCallError(err));
      throw err;
    });
  }
}