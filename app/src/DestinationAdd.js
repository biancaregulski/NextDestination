import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup } from "reactstrap";
import SearchBoxPlaces from "./SearchBoxPlaces"
import MapContainer from "./MapContainer"

class DestinationAdd extends Component {
    emptyItem = {
        cityId: "",
        name: "",
        longitude: "",
        latitude: ""
    };

    constructor(props) {
        super(props);
        this.state = {
          item: this.emptyItem,
          zoom: 1,
          lat: 10,
          lng: 10,
          destinations: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== "new") {
            const destination = await(await fetch(`/api/destination/${this.props.match.params.id}`)).json();
            this.setState({item: destination});
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch("api/destination", {
            method: "POST",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
            body: JSON.stringify(item),
        });
        this.props.history.push("/destinations");
    }
    
    handleDestinationSelect = num => {
      console.log(num);
    }

    handlePlacesResults = (address, lat, lng) => {
      console.log(typeof(lat));
      this.setState({
        zoom: 12,
        lat: lat,
        lng: lng
      })
    }

    render() { 
        const {item, lat, lng, zoom, destinations} = this.state;
        console.log(typeof(lat)); // lat/lng wont update
        return (
          <div>
            <h2>Add Destination</h2>
            <SearchBoxPlaces
              handlePlacesResults = {this.handlePlacesResults}
            />
            <MapContainer 
              zoom={zoom}
              lat={lat}
              lng={lng}
              destinations={destinations}
              handleDestinationSelect = {this.handleDestinationSelect}
            />
            <div className="image-upload-box center-text">Drag image or click here to upload</div>
          </div>
        )
    }
}
    
export default withRouter(DestinationAdd);