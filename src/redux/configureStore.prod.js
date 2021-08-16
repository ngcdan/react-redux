import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

export default function configureStore(inititalState) {
  return createStore(rootReducers, inititalState, applyMiddleware(thunk));
}