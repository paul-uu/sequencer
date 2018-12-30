import { combineReducers } from 'redux';
import isPlaying from './isPlaying';
import toneMatrix from './toneMatrix';
import { firestoreReducer } from 'redux-firestore';
import username from './username';
import isModalShown from './isModalShown';

export default combineReducers({ 
  isPlaying, 
  toneMatrix,
  firestore: firestoreReducer,
  username,
  isModalShown
});