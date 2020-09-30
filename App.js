// ./App

// Dependance React
import * as React from 'react';
// Components 
import Navigation from './src/navigation/navigation'
// Dependance AsyncStorage
import AsyncStorage  from '@react-native-community/async-storage';
// Dependance Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import {PersistGate} from 'redux-persist/es/integration/react'
// Root Redux
import rootReducer from './src/redux/index';

const persistConfig = {
  key:'root',
  storage: AsyncStorage,
  whitelist:['tokenReducer', 'idUserReducer', 'idRoleReducer', 'booksReducer', 'idAbonementReducer']
}

const persitedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore (
  persitedReducer, applyMiddleware(createLogger())
);

const peristedStore = persistStore(store)

class App extends React.Component{
  render() {
    return (
      <Provider store={store}>
          <PersistGate persistor={peristedStore} loading={null}>
            <Navigation>
            </Navigation>
        </PersistGate>
      </Provider>    
    );
  }   
}

export default (App)