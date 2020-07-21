import React, { Component } from 'react';
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import './App.css';

class CityBox extends Component {
    render() {
        const destinationsGroup = this.props.city.destinations.map(destination => {
            return <p><a href="google.com" target="_blank">{destination.name}</a></p>
        });
        return (
            <div className="col-md-3 col-sm-6">
                <div className="card mt-4">
                    <div className="card-body ">
                        <h5 className="card-title text-center">{this.props.city.city}, {this.props.city.country}</h5>
                        <img className="city-img"
                            src="https://www.langan.com/wp-content/uploads/2019/02/Boston-996x554.jpg"
                            alt="new"
                        />
                        <em>Destinations:</em>
                        {destinationsGroup}
                        <div className="center-content">
                            <p>
                                <a class="btn btn-primary btn-lg" href="/destinations/new">Add</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CityBox;