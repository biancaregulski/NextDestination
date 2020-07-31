import React, { Component } from 'react';
import './App.css';

const defaultImg = process.env.PUBLIC_URL + "/image/city.png";

class CityBox extends Component {
    render() {
        return (
            <div className="city-box-col card">
                    <div className="city-box">
                        <img className="city-img"
                            src={defaultImg}
                            alt="Default city image"
                        />
                        <div className="city-box-info text-center">
                            <h5>{this.props.city.city}</h5>
                            <em>{this.props.city.country}</em>
                        </div>
                        <div className="center-content city-box-bottom">
                            <p className="city-box-btn"><a className="btn btn-primary" href= { "cities/" + this.props.city.id }>Destinations</a></p>
                        </div>
                    </div>
            </div>
        );
    }
}

export default CityBox;