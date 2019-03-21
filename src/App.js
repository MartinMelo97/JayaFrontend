import React, { Component } from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { Grid, AppBar, Toolbar } from '@material-ui/core/'


//Components imports
import HomePage from './components/homepage/HomePage'
import Search from './components/search/Search'
import Detail from './components/detail/Detail'
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
      flexGrow: 1,
      width: "100vw",
      margin: 0,
      backgroundColor: "#F7F7F7",
      minHeight:"100vh"
    },
    container: {
      padding: "0 !important",
      margin: 0
    },
    appbar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
      padding: 0 
    },
    
})


class App extends Component {

  //constructor to declare our state to handle data
  constructor(props){
    super(props)
    this.state = {
      inputCity: "" //atribute of a state's object
    }
  }

  updateCity = (e) => { 
    /*Method to handle every change on the input
    in HomePage Component and updating the state with
    that value*/
    this.setState({inputCity: e.target.value})
  }

  render() {
    const { classes } = this.props
    return (
      <Grid container className={classes.root} spacing={16}>
      <Grid item xs={12} className={classes.container}>
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <Typography variant="h5" color="inherit">
              Prueba Técnica Jaya
            </Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route exact path="/"
            render={
              ()=><HomePage 
                inputCity={this.state.inputCity}
                updateCity={this.updateCity}
              />
            }
            />
          <Route exact path="/search/:city" component={Search} />
          <Route path="/:city/:lat/:long" component={Detail} />
        </Switch>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
