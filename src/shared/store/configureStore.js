import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers'
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware()
const enhancer = compose(
  // Middleware you want to use in development:
  // applyMiddleware(d1, d2, d3),
  applyMiddleware(sagaMiddleware),
  // Required! redux-devtoolsextension
  // https://github.com/zalmoxisus/redux-devtools-extension
  // TODO: remove on PRODUCTION build
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
);

export default (preloadedState) => {
  const store = createStore(rootReducer, preloadedState, enhancer);
  sagaMiddleware.run(rootSaga)
  return store;
}
