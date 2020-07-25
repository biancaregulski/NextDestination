import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import autosuggestTheme from "./SearchBox.module.scss";
import {Redirect} from 'react-router-dom';

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

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            value: "",
            toCityDisplay: false
        };
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    }

    getSuggestions(value) {
        const escapedValue = escapeRegexCharacters(removePunct(value.trim()));   

        if (escapedValue === "") {
            return [];
        }

        const regex = new RegExp('^' + escapedValue, 'i');
        return this.props.cityValues.filter(cityValue => regex.test(removePunct(cityValue.value)));
    }

    onSuggestionSelected(event, { suggestion }) {
        this.handleSearchSelect(suggestion.data);
    }

    handleSearchSelect(cityId) {
        this.setState({
            toCityDisplay: true,
            cityId: cityId
        });
    }

    handleSearchChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };

    onKeyDown(event) {
        if (event.key === "Enter") {
            this.returnResults();
        }
    }

    renderInputComponent = inputProps => (
        <div className="inputContainer">
            <span onClick={this.returnResults} className="icon fa fa-search"></span>
            <input {...inputProps} />
        </div>
    );

    returnResults() {
        // return set of IDs to display results
        var idSet = new Set();
        this.state.suggestions.forEach(result => {
            idSet.add(result.data)
        });

        this.props.handleChangeResults(idSet);
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
        // on suggestion click or enter, go to its cities/{id} page
        if (this.state.toCityDisplay) {
            return <Redirect to={ "cities/" + this.state.cityId }/>
        }
        
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
                    renderInputComponent={this.renderInputComponent}
                    onSuggestionSelected={this.onSuggestionSelected}
                />
            </div>
        );
    }
}

export default SearchBox;