import React, { Component } from 'react';
import { connect } from 'react-redux';
import ToneButton from './ToneButton';
import { toggleTone, initToneMatrix, togglePlay } from '../actions';
import { SIZE } from '../constants';
import Tone from 'tone';
import { createNotesArr } from '../utilities';

class ToneMatrix extends Component {
  constructor(props) {
    super(props);
    this.handleToggleTone = this.handleToggleTone.bind(this);
    this.initStepSequencer = this.initStepSequencer.bind(this);
    this.sequencerEventId = null;
    this.state = {
      num: null
    }
  }
  componentDidMount() {
    this.props.initToneMatrix(SIZE);
    
  }
  componentDidUpdate() {
    this.initStepSequencer();
  }

  handleToggleTone(row, col) {
    this.props.toggleTone(row, col);
  }

  initStepSequencer() {
    if (this.sequencerEventId !== null) {
      Tone.Transport.clear(this.sequencerEventId);
    }
    const matrix = this.props.matrix;
    const notes = createNotesArr(SIZE);
    const synths = [];
    let eventId;
    for (let i = 0; i < SIZE; i++) {
      synths.push(new Tone.Synth());
      synths[i].oscillator.type = 'sine';
      synths[i].toMaster();
    }
    if (matrix.length > 0) {
      console.log(matrix);
      eventId = Tone.Transport.scheduleRepeat(repeat, `${SIZE}n`);
      this.sequencerEventId = eventId
    }

    let index = 0;
    function repeat(time) {
      let step = index % SIZE;
      for (let i = 0; i < SIZE; i++) {
        let row = matrix[i];

        console.log(row[step]);

        if ( row[step + 1] ) {
          synths[i].triggerAttackRelease(notes[i], `${SIZE}n`, time);
          console.log( notes[i] );
        }
      }
      index++;
    }
  }

  render() {
    const matrix = this.props.matrix;
    return (
      <section className='tones'>
      {
        matrix.map((row, rowIndex) => 
          <div className='tone-row' key={`row-${rowIndex}`}>
          {
            row.map((col, colIndex) => 
              <ToneButton 
                key={'' + rowIndex + colIndex} 
                isActive={col}
                toggleTone={this.handleToggleTone.bind(null, rowIndex, colIndex) } />
            )
          }
          </div>
        )
      }
      </section>
    )
  }
}

const mapStateToProps = state => ({
  matrix: state.toneMatrix,
  isPlaying: state.isPlaying
});
const mapDispatchToProps = dispatch => ({
  toggleTone: (row, col, isActive) => dispatch(toggleTone(row, col)),
  initToneMatrix: (size) => dispatch(initToneMatrix(size)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ToneMatrix);