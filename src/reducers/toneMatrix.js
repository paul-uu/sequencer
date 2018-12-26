import { TOGGLE_TONE, SIZE } from '../constants';
import { createEmptyTonesObj } from '../utilities';

function toneMatrix(state = createEmptyTonesObj(SIZE), action) {
  switch(action.type) {
    case TOGGLE_TONE:    
    default:
      return state;
  }
}

export default toneMatrix;