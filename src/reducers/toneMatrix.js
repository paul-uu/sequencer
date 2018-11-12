import { TOGGLE_TONE, INIT_TONE_MATRIX } from '../constants';

function toneMatrix(state = [], action) {
  switch(action.type) {
    case TOGGLE_TONE:
      return state.map((row, rowIndex) => {
        if (rowIndex === action.data.row) {
          return row.map((col, colIndex) => {
            if (colIndex === action.data.col) {
              return !col;
            }
            return col;
          })
        };
        return row;
      });

    case INIT_TONE_MATRIX:
      return action.data.matrix;
      
    default:
      return state;
  }
}

export default toneMatrix;