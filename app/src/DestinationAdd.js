import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from 'reactstrap';
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

        this.imgUrlRef = React.createRef();
        
        this.state = {
          item: this.emptyItem,
          imgUrl: defaultImg,
          imgError: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        /*await fetch("api/destination", {
            method: "POST",
            headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
            },
            body: JSON.stringify(item),
        });
        this.props.history.push("/destinations");*/
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

    addDefaultSrc = e => {
      e.target.src = defaultImg;
      this.setState({
        imgError: true
      });
    }

    updateImage = e => {
      e.preventDefault();
      this.setState({
        imgUrl: this.imgUrlRef.current.value,
        imgError: false
      });
    }
    
    render() { 
        const {item, imgUrl, imgError} = this.state;
        return (
          <div className="add-dest-container center-text">
            <h2>Add Destination</h2>
            <SearchBoxPlaces
              className="add-dest-div"
              handlePlacesResults = {this.handlePlacesResults}
            />
            <div className="img-url-container left-right">
              <form className="img-url-form" onSubmit={this.updateImage}>
                <fieldset className={"add-dest-fieldset" + (imgError ? " fieldset-error" : "") }>
                  <legend>Image url</legend>
                  <input className="img-url-input" type="text" ref={this.imgUrlRef}></input>
                </fieldset>
                <Button className="img-url-btn" onClick={this.updateImage}>OK</Button>
              </form>
            </div>
            <p className="warning-msg" style={{visibility: imgError ? "visible" : "hidden"}}>Invalid image url.</p>
            <fieldset className="add-dest-fieldset">
              <legend>Image preview</legend>
              <img  className="city-img" src={imgUrl} onLoad={() => this.setState({loaded: true})} onError={this.addDefaultSrc} alt={"Image preview"}/>
            </fieldset>
            <p className="submit-btn"><a className="btn btn-primary" href="#" onClick={this.handleSubmit}>Submit</a></p>
            <p><a href="#">Go Back</a></p>
          </div>
        )
    }
}
    
export default withRouter(DestinationAdd);