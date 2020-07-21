import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CityBoxGroup from './CityBoxGroup';
import CityDisplay from './CityDisplay';
import DestinationAdd from './DestinationAdd';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/cities' exact={true} component={CityBoxGroup}/>
          <Route path='/cities/:id' component={CityDisplay}/>
          <Route path='/destinations/new' component={DestinationAdd}/>
          <Route path='/destinations/new/:id' component={DestinationAdd}/>
        </Switch>
      </Router>
    )
  }
}

export default App;