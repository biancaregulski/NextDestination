import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Map from "./MapContainer";


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
          item: this.emptyItem
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
    render() {
        const {item} = this.state;
        const title = <h2>Add Destination</h2>;
        return (
          <div>
            <Container>
              {title}
              <form action="/cities" method="GET"/>
              <div className="form-group search">
                  <input type="text" name="search" className="search" placeholder="Search city"/>
                  <button type="submit" className="btn btn-primary">Search</button>
              </div>
              <Form onSubmit={this.handleSubmit}>
                <Map />
                <FormGroup>
                  <Button color="secondary" tag={Link} to="/">Cancel</Button>
                  <Button color="primary" type="submit">Save</Button>
                </FormGroup>
              </Form>
            </Container>
          </div>
        )
    }
}
    
export default withRouter(DestinationAdd);