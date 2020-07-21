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
                        <p>Keep track of tourist destinations in cities around the world.</p>
                        <p>
                            <a class="btn btn-primary btn-lg search" href="/destinations/new">Add New Destination</a>
                        </p>
                    </div>
                    <div>
                        <form action="/cities" method="GET"/>
                        <div className="form-group search">
                            <input type="text" name="search" className="search" placeholder="Search by city"/>
                            <button type="submit" className="btn btn-primary">Search</button>
                        </div>
                        <form action="/cities" className="search" method="GET"/>
                        <div className="form-group search">
                            <input type="text" name="search" className="search" placeholder="Search by destination"/>
                            <button type="submit" className="btn btn-primary">Search</button>
                        </div>
                </div>
                    <CityBoxGroup/>
                </Container>
            </div>
        );
    }
}

export default Home;