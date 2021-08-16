import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

export default function configureStore(inititalState) {

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

  return createStore(
    rootReducers,
    inititalState,
    composeEnhancers(applyMiddleware(thunk))
  );
}