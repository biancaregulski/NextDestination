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

        console.log(cities);
        const cityBoxGroup = cities.map(city => {
            return <CityBox city={city} />
        });
        return (
            <div>
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