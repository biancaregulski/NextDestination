import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {GoogleApiWrapper} from 'google-maps-react';

class SearchBoxPlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => this.props.handlePlacesResults(address, lat, lng)   // display map
        );
    
  };

  render() {
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