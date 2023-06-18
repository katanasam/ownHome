import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// npm install react-redux 
// npm install redux
// npm install redux-persist

// REDUCER CHANGEMENT STATE
import authReducer from "./state"
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: {
        ignoreActions: [ FLUSH,REHYDRATE,PAUSE,PERSIST, PURGE,REGISTER]
      },

  }),
});



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  
  document.getElementById('root')
);