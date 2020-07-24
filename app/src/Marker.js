import React, { Component } from "react";

class Marker extends Component {
    render() {
        const {key, lat, lng, text, tooltip } = this.props;
        return (
            <div onClick={this.selectMarker} className="circle">
                <span className="circleText" title={tooltip}>
                {text}
                </span>
            </div>
        )
    }
}

export default Marker;