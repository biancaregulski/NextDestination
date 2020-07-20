import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CityBoxGroup from './CityBoxGroup';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/cities' exact={true} component={CityBoxGroup}/>
        </Switch>
      </Router>
    )
  }
}

export default App;