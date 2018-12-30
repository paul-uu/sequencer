import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUsername, toggleModal } from '../actions';

class UsernameModal extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.validateUsername = this.validateUsername.bind(this);

    this.state = {
      username: this.props.username,
      inputError: ''
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const username = this.state.username;

    if ( !this.validateUsername(username) ) {
      this.setState({ inputError: 'Please enter a valid username' })
      return;
    }

    this.props.setUsername(this.state.username);
    this.setState({ inputError: '' });
    this.closeModal();
    return;
  }

  validateUsername(username) {
    if (username.length > 0 && username.length < 30) {
      return true;
    }
  }

  handleChange(e) {
    this.setState({ username: e.target.value })
  }

  closeModal() {
    this.props.toggleModal(false);
  }

  render() {
    const isVisible = this.props.isModalShown
      ? 'visible'
      : '';

    return (
      <div className={`modal ${isVisible}`}>
        <section className='modal__main'>
          <header className='modal__header'>
            <h3>Please enter a Username</h3>
            <i className="fa fa-times modal-close" onClick={this.closeModal} aria-hidden="true"></i>
          </header>

          <div className='modal__content'>
            <form onSubmit={this.handleSubmit}>
              <input 
                type='text' 
                placeholder='username'
                value={this.state.username}
                onChange={this.handleChange} />
              
              <div className='input-error'>{this.state.inputError}</div>

              <button type='button' onClick={this.closeModal}>Cancel</button>
              <button type='submit'>Set Username</button>
            </form>
          </div>

        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.username,
  isModalShown: state.isModalShown
});

const mapDispatchToProps = dispatch => ({
  setUsername: username => dispatch(setUsername(username)),
  toggleModal: shouldShow => dispatch(toggleModal(shouldShow))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsernameModal);