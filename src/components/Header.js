import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePlay, setBpm } from '../actions';
import Tone from 'tone';

class Header extends Component {

  componentDidMount() {
    Tone.Transport.bpm.value = this.props.bpm;
  }

  render() {
    const isPlaying = this.props.isPlaying;
    return (
      <header className='header'>
        <h4 className='header__text'>sequencer</h4>
        <PlayStop 
          isPlaying={isPlaying} 
          togglePlay={this.props.togglePlay} />
        <div className='clear'></div>
      </header>
    )
  }
}

const PlayStop = props => {
  const text = props.isPlaying ? 'Stop' : 'Play';
  var handleToggle = () => {
    props.togglePlay(!props.isPlaying);
  }
  return (
    <button onClick={() => handleToggle()}>{text}</button>
  )
}

const mapStateToProps = state => ({
  isPlaying: state.isPlaying,
  bpm: state.bpm
})
const mapDispatchToProps = dispatch => ({
  togglePlay: shouldPlay => dispatch(togglePlay(shouldPlay)),
  setBpm: bpm => dispatch(setBpm(bpm))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);