import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const containerStyle = {
  width: "24vw",
  height: "360px"
}

export class MapContainer extends Component {
  constructor (props) {
    super(props);
  }

  handleDestinationSelect = selection => {
    this.props.handleDestinationSelect(selection.num);
  }

  render() {
    const { city } = this.props;

    // TODO: display info window on select marker https://github.com/fullstackreact/google-maps-react
    return (
      <div className="mapContainer">
        <Map 
          google={this.props.google}
          containerStyle={containerStyle}
          zoom={12}
          initialCenter={{
            lat: city.latitude,
            lng: city.longitude
          }}>
          {city.destinations.map(({ id, latitude, longitude, name }, index) => {
            return (
              <Marker
                key={id}
                title={name}
                position={{
                  lat: latitude,
                  lng: longitude
                }}
                num={index + 1}
                onClick={this.handleDestinationSelect}            
                icon={{
                  url: `https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_red${index + 1}.png`
                }}
              />
            );
          })}

          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>place</h1>
              </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDrwbQUER1kNvM59Cd4GWGJD6m_rFzaaL0")
})(MapContainer)