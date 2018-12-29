import { combineReducers } from 'redux';
import isPlaying from './isPlaying';
import toneMatrix from './toneMatrix';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({ 
  isPlaying, 
  toneMatrix,
  firestore: firestoreReducer
});