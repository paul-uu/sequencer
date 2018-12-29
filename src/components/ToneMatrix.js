import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ToneButton from './ToneButton';
import { asyncToggleTone } from '../actions';
import { SIZE } from '../constants';
import Tone from 'tone';
import { createNotesArr } from '../utilities';
import { firestoreConnect } from 'react-redux-firebase';
import { GridLoader } from 'react-spinners';

class ToneMatrix extends Component {
  constructor(props) {
    super(props);

    this.handleAsyncToggleTone = this.handleAsyncToggleTone.bind(this);
    this.initStepSequencer = this.initStepSequencer.bind(this);
    this.tonesObjToArray = this.tonesObjToArray.bind(this);

    this.state = {
      matrix: this.props.matrix,
      firestoreTones: this.props.firestoreTones,
      currentBeat: 1
    }
  }
  componentDidMount() {
    this.initStepSequencer();
  }
  componentDidUpdate(previousProps, previousState) {
    if (previousState.firestoreTones !== this.props.firestoreTones) {
      this.setState({ firestoreTones: this.props.firestoreTones });
    }
  }
  handleAsyncToggleTone(row, col) {
    this.props.asyncToggleTone(row, col);
  }

  initStepSequencer() {
    const notes = createNotesArr(SIZE).reverse();
    const synths = [];
    for (let i = 0; i < SIZE; i++) {
      synths.push(new Tone.Synth());
      synths[i].oscillator.type = 'sine';
      synths[i].volume.value = -5;
      synths[i].toMaster();
    }
    let index = 0;
    const repeat = (time) => {
      let step = index % SIZE;
      this.setState({ currentBeat: step + 1 });
      for (let i = 0; i < SIZE; i++) {
        let row = this.state.firestoreTones[i];
        if ( row[step] ) {
          synths[i].triggerAttackRelease(notes[i], `${SIZE}n`, time);
        }
      }
      index++;
    }
    Tone.Transport.scheduleRepeat(repeat, `${SIZE}n`);
  }

  tonesObjToArray(tonesObj) {
    let tonesArr = [];
    if (tonesObj) {
      const objLength = Object.keys(tonesObj).length;
      tonesArr = [];
      for (let i = 0; i < objLength; i++) {
        tonesArr[i] = tonesObj[i];
      }
    }
    return tonesArr;
  }

  render() {
    const firestoreTonesArr = this.tonesObjToArray(this.state.firestoreTones);
    let currentBeat = this.state.currentBeat;
    return (
      <div>
        <section className='tones'>
        {
          firestoreTonesArr.length === SIZE
      
            ? (firestoreTonesArr.map((row, rowIndex) => 
              <div className='tone-row' key={`row-${rowIndex}`}>
              {
                row.map((col, colIndex) => 
                  <ToneButton 
                    key={'' + rowIndex + colIndex} 
                    isActive={col}
                    asyncToggleTone={this.handleAsyncToggleTone.bind(null, rowIndex, colIndex)} />
                )
              }
              </div>
            )) : (
              <div className='grid-loader'>
                <GridLoader color={'#999'} size={30} />
              </div>
            )
        }
        </section>

        { firestoreTonesArr.length === SIZE && <BeatMarker currentBeat={currentBeat} /> }
      </div>
    )
  }
}

const BeatMarker = props => { 
  let markers = [];
  for (let i = 0; i < SIZE; i++) { markers.push(i + 1) }
  return (
  <div className='beat-markers'>
  {
    markers.map(marker => 
      <div 
        className={ (props.currentBeat === marker ? 'active' : '') + ' beat-marker' }
        key={marker}
      >
      </div>)
  }
  </div>
  )
}

const mapStateToProps = state => {
  let firestoreTones = state.firestore.data.toneMatrix
    ? state.firestore.data.toneMatrix.initialMatrix.tones
    : null;

  return {
    matrix: state.toneMatrix,
    isPlaying: state.isPlaying,
    firestoreTones
  }
};
const mapDispatchToProps = dispatch => ({
  asyncToggleTone: (row, col) => dispatch(asyncToggleTone(row, col))
})

export default compose(
  firestoreConnect( [{ collection: 'toneMatrix' }] ),
  connect(mapStateToProps, mapDispatchToProps)
)(ToneMatrix);