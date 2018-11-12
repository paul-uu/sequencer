import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePlay, setBpm } from '../actions';
import Tone from 'tone';

class Header extends Component {

  componentDidMount() {
    Tone.Transport.bpm.value = this.props.bpm;
    //this.initStepSequencer();
  }

  render() {
    const isPlaying = this.props.isPlaying;
    return (
      <header>
        <PlayStop 
          isPlaying={isPlaying} 
          togglePlay={this.props.togglePlay} />

        <div>BPM: {this.props.bpm}</div>
      </header>
    )
  }
}

const PlayStop = props => {
  const text = props.isPlaying ? 'Stop' : 'Play';
  var handleToggle = () => {
    props.isPlaying 
      ? Tone.Transport.stop() 
      : Tone.Transport.start();
    props.togglePlay();
  }
  return (
    <button onClick={handleToggle}>{text}</button>
  )
}

const mapStateToProps = state => ({
  isPlaying: state.isPlaying,
  bpm: state.bpm
})
const mapDispatchToProps = dispatch => ({
  togglePlay: () => dispatch(togglePlay()),
  setBpm: bpm => dispatch(setBpm(bpm))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);