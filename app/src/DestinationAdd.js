import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button } from 'reactstrap';
import SearchBoxPlaces from "./SearchBoxPlaces"

const defaultImg = process.env.PUBLIC_URL + "/image/city.png";

class DestinationAdd extends Component {
    emptyDestinationItem = {
        cityId: "",
        name: "",
        longitude: "",
        latitude: ""
    };

    constructor(props) {
        super(props);

        this.imgUrlRef = React.createRef();
        
        this.state = {
          destinationItem: this.emptyDestinationItem,
          address: "",
          imgUrl: defaultImg,
          imgError: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    handleDestinationSelect = num => {
      console.log(num);
    }

    handlePlacesResults = (address, lat, lng) => {
      console.log(lat);

      this.setState(prevState => ({
        destinationItem: {
          ...prevState.destinationItem,
          name: address,
          latitude: lat,
          longitude: lng
        }
      }))
    }

    linkState = key => {
      return event => {
          this.setState({
            [key]: event.target.value 
          });
      };
    };

    async handleSubmit(event) {
      event.preventDefault();
      const {destinationItem} = this.state;
      console.log(this.state.imgUrl);
      console.log(destinationItem.name);
      if (destinationItem.name == "" || destinationItem.latitude == "" || destinationItem.longitude == "") {
        alert("fail");
      }
      else {
        await fetch("api/city", {
          method: "POST",
          headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
          },
          body: JSON.stringify(destinationItem),
      });
      this.props.history.push("/destinations");
      }
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
        const {destinationItem, imgUrl, imgError} = this.state;
        return (
          <div className="add-dest-container center-text">
            <h2>Add Destination</h2>
            <SearchBoxPlaces
              className="add-dest-div"
              handlePlacesResults = {this.handlePlacesResults}
              value={destinationItem.name.address}
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