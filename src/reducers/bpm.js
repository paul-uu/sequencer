import { SET_BPM } from '../constants';

function bpm(state = 90, action) {
  switch(action.type) {
    case SET_BPM:
      return action.data.bpm;
    default:
    return state;
  }
}

export default bpm;