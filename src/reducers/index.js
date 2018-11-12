import { combineReducers } from 'redux';
import bpm from './bpm';
import isPlaying from './isPlaying';
import toneMatrix from './toneMatrix';

export default combineReducers({ bpm, isPlaying, toneMatrix });