import { TOGGLE_MODAL } from '../constants';

const modal = (state = false, action) => {
  switch(action.type) {
    case TOGGLE_MODAL:
      return action.data.shouldShow;
    default:
      return state;
  }
}

export default modal;