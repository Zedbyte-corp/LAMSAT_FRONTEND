import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({forceRefresh:true});
const sagaMiddleware = createSagaMiddleware();

const middlewares = [];

middlewares.push(sagaMiddleware);

// Redux logger
// if (process.env.NODE_ENV === 'development') {
  // const { logger } = require('redux-logger');
  // middlewares.push(logger);
// }

const appReducer = combineReducers({
  ...reducers,
});

const rootReducer = (state, action) => {
  if (action.type === 'AUTHENTICATE_USER_FAILURE') {
    state = undefined;
  }
  return appReducer(state, action);
};

//Will add if needed
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);
sagaMiddleware.run(rootSaga);

export { store, history };
