import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import MapContainer from "./MapContainer"

class CityDisplay extends Component {

  constructor(props) {
    super(props);

    this.cityId = props.match.params.cityId;
    this.destId = props.match.params.destId;

    this.state = { 
      city: null,
      isLoading: true,
      selectedIndex: 5
    };
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    });

    fetch('/api/cities')
      .then(response => response.json())
      .then(data => this.setState({
        city: data[this.cityId - 1],
        isLoading: false
      }));
  }

  async remove() {
    /*await fetch(`/api/cities/${cityId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGroups = [...this.state.groups].filter(i => i.cityId !== cityId);
      this.setState({groups: updatedGroups});
    });*/
  }

  handleDestinationSelect = num => {
    this.setState ({ 
      selectedIndex: num
    });
  }
  
  render() {
    const {city, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    
    const destinationList = city.destinations.map((destination, index) => {
      let indexNum = index + 1;
      return (
        <div onClick={e => this.handleDestinationSelect(indexNum)} className={"list-item left-right" + (indexNum == this.state.selectedIndex ? " selected-destination" : "")} >
          <div className="city-info">
            <a href="#"><h5>{indexNum}. {destination.name}</h5></a>    { /* select destination on map*/ }
            <p>Address 1</p>
            <p>Address 2</p>
          </div>
          <div>
            <Button color="secondary" tag={Link} to={this.remove}>X</Button>
          </div>
        </div>
    )});

    return (
      <div>
        <Container fluid>
          <div className="float-right">
            <p><a className="btn btn-primary" href="/destinations/new">Add Destination</a></p>
          </div>
          <h2>{city.city}, {city.country}</h2>
          <div className="left-right clear">
            <div className="destination-list clear card">
              {destinationList}
            </div>
            <div>
              <MapContainer 
                zoom={12}
                lat={city.latitude}
                lng={city.longitude}
                destinations={city.destinations}
                handleDestinationSelect = {this.handleDestinationSelect}
              />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default CityDisplay;