import React, { Component } from 'react';
import '../App.css';
import Header from './Header';
import ToneMatrix from './ToneMatrix';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <ToneMatrix />
      </div>
    );
  }
}

export default App;
