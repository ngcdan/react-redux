import { types } from '../actions';
import { initialState } from './initialState';

export default function apiCallStatusReducer(state = initialState.apiCallsInProgress, action) {
  if (types.BEGIN_API_CALL === action.type) {
    return state + 1;
  } else if (
    action.type === types.API_CALL_ERROR ||
    action.type.substring(action.type.length - 8) === "_SUCCESS") {
    return state - 1;
  }

  return state;
}