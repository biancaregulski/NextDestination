import React, { Component } from "react";
import { Container } from "reactstrap";
import CityBox from "./CityBox";
import ReactSearchBox from 'react-search-box';
import Pagination from "react-js-pagination";

class CityBoxGroup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            cities: [],
            isLoading: true,
            activePage: 1,
            offset: 0,
            boxesPerPage: 4,
            boxes: null,
            citiesSearch: []
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
    
        fetch('api/cities')
          .then(response => response.json())
          .then(data => this.setCity(data));      
    }
    
    setCity(data) {
        this.setState({cities: data, isLoading: false});
        data.map(city => {
            this.state.citiesSearch.push({
                key: city.id,
                value: city.city + ", " + city.country
            });
        })
    }

    handleSearch(cityId) {
        window.location.assign("cities/" + cityId);
    }

    handlePageChange(pageNumber) {
        this.setState({
            activePage: pageNumber,
            offset: (pageNumber - 1) * this.state.boxesPerPage
        });
    }

    getBoxes() {
        const slice = (this.state.cities).slice(this.state.offset, this.state.offset + this.state.boxesPerPage);
        return (slice.map(city => {
            return <CityBox city={city} />
        }));
    }

    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }

        var boxes = this.getBoxes();

        return (
            <div>
                <ReactSearchBox
                    placeholder="Search cities"
                    data={this.state.citiesSearch}
                    onSelect={record => this.handleSearch(record.key)}
                    fuseConfigs={{
                        threshold: 0.2,
                    }} 
                />
                <Container fluid>
                    <div className="city-box-row">
                        {boxes}
                    </div>
                </Container>
                <div className="center-content">
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.boxesPerPage}
                    totalItemsCount={this.state.cities.length}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange.bind(this)}
                    itemClass="page-item"
                    linkClass="page-link"
                />
                </div>
            </div>
        );
    }
}

export default CityBoxGroup;