export const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

export const createEmptyMatrix = size => {
  let matrix = [];
  for (var i = 0; i < size; i++) {
    matrix.push([]);
    for (var j = 0; j < size; j++) {
      matrix[i][j] = false;
    }
  }
  return matrix;
}

export const createNotesArr = (size, startingNote, startingOctave) => {

  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const note = typeof startingNote === 'string' ? startingNote : 'C';
  const octave = typeof startingOctave === 'number' ? startingOctave : 4;
  
  let notesArr = [];
  if ((typeof size === 'number' && size > 0) && note && octave) {

    // fill array with notes
    let startingIndex = notes.indexOf(note);
    for (let i = startingIndex; i < size + startingIndex; i++) {
      notesArr.push(notes[ i % notes.length ]);
    }

    // append ocatave to each note
    let currentOctave = octave;
    return notesArr.map((note, i) => {
      if (note === notes[0] && i > 0) {
        currentOctave++;
      }
      return `${note}${currentOctave}`;
    });
  }
  else {
    const error = new Error('Bad arguments to function createNotesArr');
    console.error(error);
  } 
}