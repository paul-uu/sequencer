import {
  TOGGLE_PLAY, TOGGLE_TONE, SIZE, TOGGLE_MODAL, SET_USERNAME
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


export const toggleModal = shouldShow => ({
  type: TOGGLE_MODAL,
  data: { shouldShow }
});

export const setUsername = username => ({
  type: SET_USERNAME,
  data: { username }
});

export const asyncSetUsername = (username, isAdded) => (dispatch, getState, { getFirebase, getFirestore }) => {

  const firestore = getFirestore();
  const firebase = getFirebase();
  const currentUsersRef = firestore.collection('currentUsers').doc('currentUsers');

  currentUsersRef.get().then(doc => {
    const currentUsers = doc.data().users;

    if (isAdded) {
      if (currentUsers.indexOf(username) > -1) {
        console.log('username taken');
        return;  
      }
      currentUsersRef.update({ 
        users: firebase.firestore.FieldValue.arrayUnion(username)
      });
      return;
    }
    else {
      currentUsersRef.update({ 
        users: firebase.firestore.FieldValue.arrayRemove(username) 
      });
    }
  })
  .then(() => {
    dispatch(setUsername(username));
  })
  .catch(err => {
    dispatch({ type: 'SET_USERNAME_ERROR', error: err })
    console.log('error setting username: ' + username);
    console.log(err);
  });

}