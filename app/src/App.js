// mvnw spring-boot:run
// yarn start

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
          <Container className="main-container" fluid>
            <Switch>
              <Route path='/' exact={true} component={Home}/>
              <Route path='/cities' exact={true} component={CityBoxGroup}/>
              <Route path='/cities/:id' component={CityDisplay}/>
              <Route path='/cities/:id/destination/:destId' component={CityDisplay}/>
              <Route path='/destinations/new' component={DestinationAdd}/>
              <Route path='/destinations/new/:id' component={DestinationAdd}/>
            </Switch>
          </Container>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App;