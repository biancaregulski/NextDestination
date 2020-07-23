import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import autosuggestTheme from "./AutosuggestTheme.module.scss";

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function removePunct(str) {
    return str.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "");
}

function getSuggestionValue(suggestion) {
    return suggestion.value;
};

function shouldRenderSuggestions() {
    return true;
}

function renderSuggestion(suggestion) {
    return (
        <div>
            <span>{suggestion.value}</span>
        </div>
    );
};

// TODO: fix icon padding and make it clickable
const renderInputComponent = inputProps => (
    <div className="inputContainer">
      <input {...inputProps} />
      <i class=" icon fa fa-search"></i>
    </div>
  );

// TODO: render suggestions when input is blank
// TODO: enter on highlighted suggestion goes to /cities/{id}

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            value: ""
        };
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    getSuggestions(value) {
        const escapedValue = escapeRegexCharacters(removePunct(value.trim()));   

        if (escapedValue === "") {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');
        return this.props.cityValues.filter(cityValue => regex.test(removePunct(cityValue.value)));
    }

    handleSearchSelect(cityId) {
        window.location.assign("cities/" + cityId);
    }

    handleSearchChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    onKeyDown(event) {
        if (event.key === "Enter") {
            // return set of IDs to display results
            var idSet = new Set();
            this.state.suggestions.forEach(result => {
                idSet.add(result.data)
            });

            this.props.handleChangeResults(idSet);
        }
    }
    
    onSuggestionsFetchRequested = ({ value }) => {
        const results = this.getSuggestions(value);
        this.setState({
            suggestions: results
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const value = this.state.value;

        const inputProps = {
            placeholder: "Search cities",
            value,
            onKeyDown: this.onKeyDown,
            onChange: this.handleSearchChange
        };

        return (
            <div>
                <Autosuggest theme={autosuggestTheme}
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    shouldRenderSuggestions={shouldRenderSuggestions}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    renderInputComponent={renderInputComponent}
                />
            </div>
        );
    }
}

export default SearchBox;