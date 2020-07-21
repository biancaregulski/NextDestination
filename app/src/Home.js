import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import CityBoxGroup from "./CityBoxGroup.js"
import { Container, Button } from 'reactstrap';

// #5a42fd

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container className="main-container" fluid>
                    <div className="jumbotron">
                        <h1>Next Destination</h1>      
                        <p>Keep track of tourist destinations in cities around the world</p>
                        <p>
                            <a className="btn btn-primary btn-lg" href="/destinations/new">Add New Destination</a>
                        </p>
                    </div>
                    <CityBoxGroup/>
                </Container>
            </div>
        );
    }
}

export default Home;