import React, { Component } from "react";
import { Container } from "reactstrap";
import CityBox from "./CityBox";
import ReactSearchBox from 'react-search-box'

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
    
    handleSearch(cityId) {
        window.location.assign("cities/" + cityId);
    }

    render() {
        const {cities, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        var citiesSearch = [];

        var cityBoxGroup = cities.map(city => {
            citiesSearch.push({
                key: city.id,
                value: city.city + ", " + city.country
            });
            return <CityBox city={city} />
        });

        return (
            <div>
                <ReactSearchBox
                    placeholder="Search cities"
                    data={citiesSearch}
                    onSelect={record => this.handleSearch(record.key)}
                    fuseConfigs={{
                        threshold: 0.2,
                    }} 
                />
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