import React, { Component } from 'react';
import Grid from './Grid';
import GameInfo from './GameInfo';
import InputBox from './InputBox';

class App extends Component {
  render() {
    return (
      <div className="ui container" style={{ height: '500px', width: '500px' }}>
        <InputBox />
        <Grid />
        {/* <GameInfo /> */}
      </div>
    );
  }
}

export default App;
