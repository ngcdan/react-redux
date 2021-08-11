import { createStore } from 'redux';
import rootReducers from './reducers';

export default function configureStore(inititalState) {
  return createStore(
    rootReducers,
    inititalState
  );
}