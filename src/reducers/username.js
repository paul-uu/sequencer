import { SET_USERNAME } from '../constants';

const username = (state = '', action) => {
  switch(action.type) {
    case SET_USERNAME:
      return action.data.username;
    default:
      return state;
  }
}

export default username;