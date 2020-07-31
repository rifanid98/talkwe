import { combineReducers, createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise-middleware';
import logger from 'redux-logger';

// Persist Library
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
// @rnc/async-storage support for web macos and windows
// import { AsyncStorage } from "@react-native-community/async-storage";

/**
 * reducer
 */
import auth from './auth/reducer';
import users from './users/reducer';
import apps from './apps/reducer';
import friends from './friends/reducer';
import messages from './messages/reducer';
import location from './location/reducer';


// Combine The Reducers
const reducer = combineReducers({
  auth,
  users,
  apps,
  friends,
  messages,
  location
});

/**
 * PersistConfig
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'auth',
    'apps',
    'friends',
    'messages',
    'users',
    'location'
  ],
};

const persistedReducer = persistReducer(persistConfig, reducer);

/**
 * store
 */
export const store = createStore(
  persistedReducer,
  // applyMiddleware(reduxPromise)
  applyMiddleware(reduxPromise, logger),
);

/**
 * dispatcher
 */
export * from './auth/actions';
export * from './users/actions';
export * from './apps/actions';
export * from './friends/actions';
export * from './messages/actions';
export * from './location/actions';

/**
 * selector
 */
// export * from './post/selector';
// export * from './profile/selector';
