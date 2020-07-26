import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import firebase from 'firebase/app'

import { Provider } from 'react-redux'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import { createStore, combineReducers } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase'
import {composeWithDevTools} from 'redux-devtools-extension'

const firebaseConfig = {
    apiKey: "AIzaSyAyov1fER_DR1chnd7m9ISwXoIG6GMic1o",
    authDomain: "ravedeejay.firebaseapp.com",
    databaseURL: "https://ravedeejay.firebaseio.com",
    projectId: "ravedeejay",
    storageBucket: "ravedeejay.appspot.com",
    messagingSenderId: "861960036963",
    appId: "1:861960036963:web:2a37fbee0e15a406164e56"
  };

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer
  // firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state
const store = createStore(rootReducer, composeWithDevTools())

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  // enableClaims: true // Get custom claims along with the profile
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

 ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
    <App />
    </ReactReduxFirebaseProvider>
  </Provider>
  , document.getElementById('root'));

export default firebaseConfig;
