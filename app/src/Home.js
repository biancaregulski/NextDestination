import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import CityBoxGroup from "./CityBoxGroup.js"
import { Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <CityBoxGroup/>
                </Container>
            </div>
        );
    }
}

export default Home;