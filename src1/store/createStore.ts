import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
// TODO: uncomment before PR
// import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import reducers, { apiMiddleware } from './';
import rootSaga from './rootSaga';
import userReducer from './user/Reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 100000,
  whitelist: ['location', 'home', 'categories'], // Saved State when open initial app
  blackList: ['user', 'orders', 'requestDelivery', 'categoriesVehicleSlice'], // Don't Saved State
};

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
  blacklist: ['loading', 'error'],
};

export const configStore = () => {
  // console.log('reducers', reducers);
  const middleware: any = [];
  // const enhancers = [];

  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  // TODO: uncomment before PR
  // if (process.env.NODE_ENV === 'development') {
  //   middleware.push(logger);
  // }
  middleware.push(...apiMiddleware);

  // enhancers.push(applyMiddleware(...middleware));
  const rootReducer = combineReducers({
    ...reducers,
    user: persistReducer(userPersistConfig, userReducer),
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
      const middlewareD = getDefaultMiddleware({
        serializableCheck: false,
      });

      if (__DEV__) {
        //   const createDebugger = require('redux-flipper').default
        //   middleware.push(createDebugger())
      }

      return middlewareD.concat(apiMiddleware).concat(middleware);
    },
  });
  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
