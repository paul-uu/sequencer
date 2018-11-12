import {
  TOGGLE_PLAY, TOGGLE_TONE, SET_BPM, INIT_TONE_MATRIX
} from '../constants';
import { createEmptyMatrix } from '../utilities';

export const togglePlay = () => ({ 
  type: TOGGLE_PLAY
});
export const setBpm = bpm => ({ 
  type: SET_BPM,
  data: { bpm } 
});
export const toggleTone = (row, col) => ({
  type: TOGGLE_TONE,
  data: { row, col }
});
export const initToneMatrix = size => ({
  type: INIT_TONE_MATRIX,
  data: { 
    matrix: createEmptyMatrix(size) 
  }
});