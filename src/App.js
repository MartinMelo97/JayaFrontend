import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/search/:city" component={Search} />
          <Route path="/:city/:lat/:long" component={CityDetail} />
        </Switch>
      </div>
    );
  }
}

export default App;
