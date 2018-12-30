import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePlay } from '../actions';
import Tone from 'tone';
import { BPM } from '../constants';

class Header extends Component {

  componentDidMount() {
    Tone.Transport.bpm.value = BPM;
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
  const icon = props.isPlaying
    ? <i class="fa fa-pause" aria-hidden="true"></i>
    : <i class="fa fa-play" aria-hidden="true"></i>;

  var handleToggle = () => {
    props.togglePlay(!props.isPlaying);
  }

  return (
    <span className='play-stop' onClick={() => handleToggle()}>{icon}</span>
  )
}

const mapStateToProps = state => ({
  isPlaying: state.isPlaying
})
const mapDispatchToProps = dispatch => ({
  togglePlay: shouldPlay => dispatch(togglePlay(shouldPlay))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);