import { combineReducers } from 'redux';
import bpm from './bpm';
import isPlaying from './isPlaying';
import toneMatrix from './toneMatrix';
import { firestoreReducer } from 'redux-firestore'; // reducer for syncing local redux store with firestore db
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({ 
  bpm, 
  isPlaying, 
  toneMatrix,
  firestore: firestoreReducer
});