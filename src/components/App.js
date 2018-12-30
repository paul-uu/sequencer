import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import ToneMatrix from './ToneMatrix';
import UsernameModal from './UsernameModal';
import { connect } from 'react-redux';
import { setUsername } from '../actions';

class App extends Component {

  componentDidMount() {
    window.addEventListener("beforeunload", e => {
      this.props.setUsername(null);
    })
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <ToneMatrix />
        <UsernameModal />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUsername: username => dispatch(setUsername(username))
});

export default connect(null, mapDispatchToProps)(App);
