import {
  TOGGLE_PLAY, TOGGLE_TONE, SIZE
} from '../constants';
import { createEmptyTonesObj } from '../utilities';
import Tone from 'tone';

export const togglePlay = shouldPlay => dispatch => {

  if (shouldPlay) {
    if (Tone.context.state !== 'running') {
      Tone.context.resume();
    }
    Tone.Transport.start();
  } else {
    Tone.Transport.stop();
  }

  dispatch({
    type: TOGGLE_PLAY,
  });
}

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
    dispatch({ 
      type: TOGGLE_TONE
    });
  });
};