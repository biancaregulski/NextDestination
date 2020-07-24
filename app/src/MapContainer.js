import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

class MapComponent extends Component {
    constructor (props) {
        super(props);    
    }
      
    render() {
        const { city } = this.props;

        return (
            <div className="mapContainer">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyDrwbQUER1kNvM59Cd4GWGJD6m_rFzaaL0",
                  language: "en",
                  region: "US"
                }}

                defaultCenter={{ lat: city.latitude, lng: city.longitude }}
                defaultZoom={12}
              >
                {city.destinations.map(({ id, latitude, longitude, name }, index) => {
                  return (
                    <Marker
                      key={id}
                      lat={latitude}
                      lng={longitude}
                      text={index + 1}
                      tooltip={name}
                    />
                  );
                })}
              </GoogleMapReact>
            </div>
          );
    }
}

export default MapComponent;