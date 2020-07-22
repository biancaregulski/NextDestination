import React, { Component } from "react";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.Open
        });
    }

    render() {
        return (
            <Navbar id="navbar" color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/">Next Destination</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem className="navbar-right">
                            <NavLink href="https://github.com/biancaregulski">Login</NavLink>
                        </NavItem>
                        <NavItem className="navbar-right">
                            <NavLink href="https://github.com/biancaregulski">Register</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}