import React, { Component } from "react";
import { Container } from "reactstrap";
import CityBox from "./CityBox";

class CityBoxGroup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cities: [],
            isLoading: true
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
    
        fetch('api/cities')
          .then(response => response.json())
          .then(data => this.setState({cities: data, isLoading: false}));
    }

    render() {
        const {cities, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const cityBoxGroup = cities.map(city => {
            return <CityBox city={city} />
        });
        return (
            <div>
                <form action="/cities" method="GET"/>
                <div className="form-group search">
                    <input type="text" name="search" className="search" placeholder="Search by city"/>
                    <button type="submit" className="btn btn-secondary">Search</button>
                </div>
                <form action="/cities" className="search" method="GET"/>
                <div className="form-group search">
                    <input type="text" name="search" className="search" placeholder="Search by destination"/>
                    <button type="submit" className="btn btn-secondary">Search</button>
                </div>
                <Container fluid>
                    <div className="row d-flex flex-wrap mb-4">
                        {cityBoxGroup}
                    </div>
                </Container>
            </div>
        );
    }
}

export default CityBoxGroup;