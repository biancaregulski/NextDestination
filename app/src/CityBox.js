import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './App.css';

class CityBox extends Component {
    render() {
        const destinationsGroup = this.props.city.destinations.map(destination => {
            return <p><a href={ "cities/" + this.props.city.id + "/destination/" + destination.id} 
                target="_blank">{destination.name}</a></p>
        });
        return (
            <div className="city-box-col card">
                    <div className="city-box">
                        <div className="city-box-info">
                            <Link to={{ 
                                    pathname: "/cities/" + this.props.city.id,
                                }}>
                                <h5 className="card-title text-center">{this.props.city.city}, {this.props.city.country}</h5>
                            </Link>
                            <img className="city-img"
                                src="https://www.langan.com/wp-content/uploads/2019/02/Boston-996x554.jpg"
                                alt="new"
                            />
                            <em>Destinations:</em>
                            {destinationsGroup}
                        </div>
                        <div className="center-content city-box-bottom">
                            <p className="city-box-btn"><a className="btn btn-primary" href= {"/destinations/new/" + this.props.city.id}>Add</a></p>
                        </div>
                    </div>
            </div>
        );
    }
}

export default CityBox;