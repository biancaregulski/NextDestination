import React, { Component } from 'react';
import { Button, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import MapContainer from "./MapContainer"

class CityDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      city: null,
      isLoading: true
    };
    this.id = props.match.params.id;
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/api/cities')
      .then(response => response.json())
      .then(data => this.setState({
        city: data[this.id - 1],
        isLoading: false
      }));
  }

  async remove() {
    /*await fetch(`/api/cities/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGroups = [...this.state.groups].filter(i => i.id !== id);
      this.setState({groups: updatedGroups});
    });*/
  }

  render() {
    const {city, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    let counter = 0;
    const destinationList = city.destinations.map(destination => {

      return( 
        <div className="list-item left-right" >
          <div>
            <a href=""><h5>{destination.name}</h5></a>    { /* select destination on map*/ }
            <p>Address 1</p>
            <p>Address 2</p>
          </div>
          <div>
            <Button color="secondary" tag={Link} to={this.remove}>X</Button>
          </div>
        </div>
    )});

    return (
      // change to grid display
      <div>
        <Container fluid>
          <div className="float-right">
            <p><a class="btn btn-primary" href="/destinations/new">Add Destination</a></p>
          </div>
          <h2>{city.city}, {city.country}</h2>
          <div className="left-right clear">
            <div className="destination-list clear card">
              {destinationList}
            </div>
            <div>
              <MapContainer city={city}/>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default CityDisplay;