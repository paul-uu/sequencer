import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import ToneMatrix from './ToneMatrix';
import UsersList from './UsersList';
import UsernameModal from './UsernameModal';
import { connect } from 'react-redux';
import { setUsername, asyncSetUsername } from '../actions';

class App extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.username !== "") {
      window.onbeforeunload = e => {
        this.props.asyncSetUsername(this.props.username, false);
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Header />

        <div className='flex-container'>
          <ToneMatrix />
          <UsersList />        
        </div>

        <UsernameModal />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: state.username
});

const mapDispatchToProps = dispatch => ({
  setUsername: username => dispatch(setUsername(username)),
  asyncSetUsername: (username, isAdded) => dispatch(asyncSetUsername(username, isAdded))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
