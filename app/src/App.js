/* mvnw spring-boot:run
 * mvnw spring-boot:run -Dspring-boot.run.profiles=dev
 * yarn start
 * yarn run start */

import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CityBoxGroup from './CityBoxGroup';
import CityDisplay from './CityDisplay';
import DestinationAdd from './DestinationAdd';
import AppNavbar from './AppNavbar';
import Footer from './Footer';
import { Container } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Router>
        <div id="page-container">
          <AppNavbar/>
          <div className="main-container">
            <Switch>
              <Route path='/' exact={true} component={Home}/>
              <Route path='/cities' exact={true} component={CityBoxGroup}/>
              <Route path='/cities/:cityId' component={CityDisplay}/>
              <Route path='/cities/:cityId/destination/:destId' component={CityDisplay}/>
              <Route path='/destinations/new' component={DestinationAdd}/>
              <Route path='/destinations/new/:id' component={DestinationAdd}/>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;