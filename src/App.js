import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'

//Components imports
import HomePage from './components/homepage/HomePage'

class App extends Component {

  //constructor to declare our state to handle data
  constructor(props){
    super(props)
    this.state = {
      inputCity: null //atribute of a state's object
    }
  }

  updateCity = (e) => { 
    /*Method to handle every change on the input
    in HomePage Component and updating the state with
    that value*/
    this.setState({inputCity: e.target.value})
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/"
            render={
              ()=><HomePage 
                inputCity={this.state.inputCity}
                updateCity={this.updateCity}
              />
            }
            />
          {/*<Route path="/search/:city" component={Search} />
          <Route path="/:city/:lat/:long" component={CityDetail} />*/}
        </Switch>
      </div>
    );
  }
}

export default App;
