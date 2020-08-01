import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {GoogleApiWrapper} from 'google-maps-react';

class SearchBoxPlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        address: "",
        address_components: [],
        latitude: null,
        longitude: null
    };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = (address, types) => {
    console.log(types);
    geocodeByAddress(address)
        .then(results => {
            this.parseAddressComponents(results);
            console.log()
        });
        //.then(({ lat, lng }) => this.props.handlePlacesResults(address, lat, lng)
  };

  parseAddressComponents(results) {
    let city = null, country = null;
    results[0].address_components.forEach(component => {
        if (component.types[0] == "locality") {
            city = component.long_name;
        }
        else if (component.types[0] == "country") {
            country = component.long_name;
        }
    });
    this.setState({
        city,
        country,
        latitude: results[0].geometry.location.lat(),
        longitude: results[0].geometry.location.lng()
    });
  }

  render() {
    console.log(this.state.city);
    console.log(this.state.country);
    return (
        <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                    <div class="inputContainer">
                        <span onClick={this.returnResults} className="icon fa fa-search"></span>
                        <div>
                            <input
                            {...getInputProps({
                                placeholder: 'Search Places...',
                                className: 'location-search-input',
                            })}
                            />
                        </div>
                    </div>
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                            return (
                            <div
                                {...getSuggestionItemProps(suggestion, {
                                className,
                                })}
                            >
                                <span>{suggestion.description}</span>
                            </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyDrwbQUER1kNvM59Cd4GWGJD6m_rFzaaL0")
  })(SearchBoxPlaces)