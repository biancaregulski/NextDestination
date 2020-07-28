import React, { Component } from "react";
import { Container } from "reactstrap";
import CityBox from "./CityBox";
import SearchBox from "./SearchBox.js";
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
            cityBoxes: null,
            citiesResults: [],
            cityValues: []
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
    
        fetch('api/cities')
            .then(response => response.json())
            .then(data => this.setCityData(data));      
    }
    
    setCityData = (data) => {
        this.setState({
            cities: data, 
            citiesResults: data,
            isLoading: false
        });

        data.map(city => {
            this.state.cityValues.push({
                value: city.city + ", " + city.country,
                data: city.id
            });
        });

        this.setState({
            cityBoxes: this.getBoxes()
        });
    }
    
    updateResults(idSet) {
        this.state.citiesResults = [];
        this.state.cities.map(city => {
            // if idSet from search include id, add to results to be displayed on page
            if (idSet.has(city.id)) {
                this.state.citiesResults.push(city);
            }
        });
    }

    handlePageChange(pageNumber) {
        // first change state without rendering
        this.state.activePage = pageNumber;
        this.state.offset = (pageNumber - 1) * this.state.boxesPerPage;

        // next render with updated state
        this.setState({
            cityBoxes: this.getBoxes()
        });
    }

    handleChangeResults = idSet => {
        if(idSet.size === 0) {
            this.state.citiesResults = this.state.cities;
        }
        
        else {
            this.updateResults(idSet);
        }

        this.setState({
            cityBoxes: this.getBoxes()
        });
    }

    getBoxes() {
        const slice = (this.state.citiesResults).slice(this.state.offset, this.state.offset + this.state.boxesPerPage);
        return (slice.map(city => {
            return <CityBox city={city} />
        }));
    }

    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }

        const searchBox = (
            <SearchBox 
                cityValues={this.state.cityValues} 
                handleChangeResults={this.handleChangeResults}
                alwaysRenderSuggestions={true}
            />
        );

        return (
            <div>
                { searchBox }
                <Container fluid>
                    <div className="city-box-row">
                        {this.state.cityBoxes}
                    </div>
                </Container>
                <div className="center-content">
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.boxesPerPage}
                        totalItemsCount={this.state.citiesResults.length}
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