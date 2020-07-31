import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import SearchBoxPlaces from "./SearchBoxPlaces"

const defaultImg = process.env.PUBLIC_URL + "/image/city.png";

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
          imgUrl: defaultImg
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
    }

    linkState = key => {
      return event => {
          this.setState({
            [key]: event.target.value 
          });
      };
    };

    handleSubmit() {
      console.log(this.state.imgUrl);
    }

    addDefaultSrc(e) {
      e.target.src = defaultImg;
    }
    
    render() { 
        const {item} = this.state;
        let message = "";
        return (
          <div className="add-dest-container center-text">
            <h2>Add Destination</h2>
            <SearchBoxPlaces
              className="add-dest-div"
              handlePlacesResults = {this.handlePlacesResults}
            />
            <TextField
              className="add-dest-div"
              id="outlined-basic"
              label="Image url"
              variant="outlined"
              value={this.state.imgUrl !== "/image/city.png" ? this.state.imgUrl : ""}
              onChange={this.linkState('imgUrl')}
            />
            { /* change onChange above to button click to update state and change img preview */ }
            <fieldset className="image-preview ">
              <legend>Image preview</legend>
              <img  className="city-img" onError={this.addDefaultSrc} src={this.state.imgUrl} alt={"Image preview"}/>
            </fieldset>
            <TextField 
              className="add-dest-div"
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={3}
              variant="outlined"
              value={this.state.description} 
              onChange={this.linkState('description')}
            />
            <p className="submit-btn"><a className="btn btn-primary" href="#" onClick={this.handleSubmit}>Submit</a></p>
            <p><a href="#">Go Back</a></p>
          </div>
        )
    }
}
    
export default withRouter(DestinationAdd);