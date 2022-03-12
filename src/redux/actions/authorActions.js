import * as types from './actionTypes';
import { beginApiCall } from './apiStatusAction';
import { rest } from '../../api/apiUtils';

export function loadAuthors(successCb, failCb) {
  return function (dispatch) {
    dispatch(beginApiCall());
    rest.get("authors", null, (authors) => {
      successCb(authors);
      dispatch({ type: types.LOAD_AUTHORS_SUCCESS, authors });
    }, (err) => {
      failCb(err);
      dispatch(apiCallError(err));
      throw err;
    });
  }
}