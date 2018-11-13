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
    this.state = {
      matrix: this.props.matrix
    }
  }
  componentDidMount() {
    this.initStepSequencer();
  }
  componentDidUpdate(previousProps, previousState) {
    if (previousState.matrix !== this.props.matrix) {
      this.setState({ matrix: this.props.matrix });
    }
  }
  handleToggleTone(row, col) {
    this.props.toggleTone(row, col);
  }

  initStepSequencer() {
    const notes = createNotesArr(SIZE).reverse();
    const synths = [];
    for (let i = 0; i < SIZE; i++) {
      synths.push(new Tone.Synth());
      synths[i].oscillator.type = 'sine';
      synths[i].toMaster();
    }
    let index = 0;
    const repeat = (time) => {
      let step = index % SIZE; // current beat

      for (let i = 0; i < SIZE; i++) {
        let row = this.state.matrix[i];
        if ( row[step] ) {
          synths[i].triggerAttackRelease(notes[i], `${SIZE}n`, time);
        }
      }
      index++;
    }
    Tone.Transport.scheduleRepeat(repeat, `${SIZE}n`);
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