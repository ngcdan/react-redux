import { combineReducers } from 'redux';
import courses from './courseReducers';
import authors from './authorReducers';
import apiCallsInProgress from './apiCallStatusReducer';

const rootReducers = combineReducers({
  courses,
  authors,
  apiCallsInProgress,
});

export default rootReducers;
