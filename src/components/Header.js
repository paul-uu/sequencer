import React, { Component } from 'react';
import { connect } from 'react-redux';
import { togglePlay, toggleModal } from '../actions';
import Tone from 'tone';
import { BPM } from '../constants';

class Header extends Component {

  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    Tone.Transport.bpm.value = BPM;
  }

  showModal() {
    this.props.toggleModal(true);
  }

  render() {
    const isPlaying = this.props.isPlaying;
    const username = this.props.username
      ? `hello ${this.props.username}`
      : `what's your name?`;

    return (
      <header className='header'>
        <h4 className='header__text'>sequencer</h4>
        <div className='header__username' onClick={this.showModal}>
          {username}
        </div>
        <PlayStop 
          isPlaying={isPlaying} 
          togglePlay={this.props.togglePlay} />
      </header>
    )
  }
}

const PlayStop = props => {
  const icon = props.isPlaying
    ? <i className="fa fa-pause" aria-hidden="true"></i>
    : <i className="fa fa-play" aria-hidden="true"></i>;

  var handleToggle = () => {
    props.togglePlay(!props.isPlaying);
  }

  return (
    <span className='play-stop' onClick={() => handleToggle()}>{icon}</span>
  )
}

const mapStateToProps = state => ({
  isPlaying: state.isPlaying,
  username: state.username
})
const mapDispatchToProps = dispatch => ({
  togglePlay: shouldPlay => dispatch(togglePlay(shouldPlay)),
  toggleModal: shouldShow => dispatch(toggleModal(shouldShow))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);