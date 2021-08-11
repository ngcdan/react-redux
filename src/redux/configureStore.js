import { createStore, compose } from 'redux';
import rootReducers from './reducers';

export default function configureStore(inititalState) {
  return createStore(
    rootReducers,
    inititalState,
    compose()
  );
}