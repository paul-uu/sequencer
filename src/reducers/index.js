import { combineReducers } from 'redux';
import bpm from './bpm';
import isPlaying from './isPlaying';
import toneMatrix from './toneMatrix';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({ 
  bpm, 
  isPlaying, 
  toneMatrix,
  firestore: firestoreReducer
});