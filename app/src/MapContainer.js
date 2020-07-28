import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const containerStyle = {
  width: "24vw",
  height: "360px"
}


export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  handleDestinationSelect = (selection)=> {
    this.props.handleDestinationSelect(selection.num);
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    const { zoom, lat, lng, destinations } = this.props;

    // TODO: display info window on select marker https://github.com/fullstackreact/google-maps-react
    return (
      <div className="mapContainer">
        <Map 
          google={this.props.google}
          onClick={this.onMapClicked}
          containerStyle={containerStyle}
          zoom={zoom}
          initialCenter={{
            lat: lat,
            lng: lng
          }}
          center={{
            lat: lat,
            lng: lng
          }}
        >
          {destinations !== null && destinations.map(({ id, latitude, longitude, name }, index) => {
            return (
              <Marker
                name={name}
                key={id}
                title={name}
                position={{
                  lat: latitude,
                  lng: longitude
                }}
                num={index + 1}
                onClick={this.onMarkerClick}            
                icon={{
                  url: `https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red${index + 1}.png`
                }}
              />
            );
          })}
          <InfoWindow
            visible={this.state.showingInfoWindow}
            marker={this.state.activeMarker}>
              <div>
                <h6>{this.state.selectedPlace.name}</h6>
              </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

MapContainer.defaultProps = {
  destinations: null
};

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDrwbQUER1kNvM59Cd4GWGJD6m_rFzaaL0")
})(MapContainer)