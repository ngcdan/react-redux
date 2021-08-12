import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

export default function configureStore(inititalState) {
  return createStore(
    rootReducers,
    inititalState,
    compose(applyMiddleware(thunk))
  );
}