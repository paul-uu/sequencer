import {
  TOGGLE_PLAY, TOGGLE_TONE, SET_BPM, INIT_TONE_MATRIX, SIZE
} from '../constants';
import { createEmptyMatrix, createEmptyTonesObj } from '../utilities';

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


export const asyncToggleTone = (row, col) => (dispatch, getState, { getFirebase, getFirestore }) => {
  const firestore = getFirestore();

  const toneMatrixRef = firestore.collection('toneMatrix').doc('initialMatrix');
  toneMatrixRef.get().then(doc => {

    let tones = doc.data().tones;
    if (Object.keys(tones).length !== SIZE)
      toneMatrixRef.set({ 'tones': createEmptyTonesObj(SIZE) });

    tones[row][col] = !tones[row][col];
    toneMatrixRef.set({ 'tones': tones });
    
  })
  .then(() => {
    console.log('async action complete');
  });
};


export const initToneMatrix = size => ({
  type: INIT_TONE_MATRIX,
  data: { 
    matrix: createEmptyMatrix(size) 
  }
});