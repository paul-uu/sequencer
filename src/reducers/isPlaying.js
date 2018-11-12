import { TOGGLE_PLAY } from '../constants';

function isPlaying(state = false, action) {
  switch(action.type) {
    case TOGGLE_PLAY:
      return !state;
    default:
      return state;      
  }
}

export default isPlaying;