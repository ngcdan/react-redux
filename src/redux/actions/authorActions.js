import { loadAll } from '../reducers/authorSlice';
import { fullfilled, pending } from '../reducers/apiCallStatusSlice';
import { rest } from '../../api';

export function loadAuthors(successCb, failCb) {
  return function (dispatch) {
    dispatch(pending());
    rest.get("authors", null, (authors) => {
      if (successCb) successCb(authors);
      dispatch(loadAll(authors));
      dispatch(fullfilled());
    }, (err) => {
      if (failCb) failCb(err);
      dispatch(fullfilled(err));
      throw new Error(err);
    });
  }
}