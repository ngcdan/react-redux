import { combineReducers } from 'redux';
import courseReducer from './courseSlice';
import authorReducer from './authorSlice';
import apiCallReducer from './apiCallStatusSlice';

export const rootReducers = combineReducers({
  courses: courseReducer,
  authors: authorReducer,
  apiCallsInProgress: apiCallReducer,
});


/*
export function rootReducer(state = {}, action) {
  return {
    courses: courses(state.courses, action),
    authors: authors(state.authors, action),
    apiCalls: apiCallsInProgress(state.apiCalls, action)
  }
}
*/


