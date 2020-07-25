import React, { Component } from "react";

class Marker extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          city: null,
          isLoading: true
        };
        this.selectMarker = this.selectMarker.bind(this);
    }

    selectMarker() {
        this.props.handleDestinationSelect(this.props.num);
    }

    render() {
        const {key, lat, lng, num, tooltip } = this.props;
        return (
            <div onClick={this.selectMarker} className="circle">
                <span className="circleText" title={tooltip}>
                    {num + 1}
                </span>
            </div>
        )
    }

}

export default Marker;