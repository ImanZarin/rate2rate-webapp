import { Component } from "react";
import React from "react";
import { Nav, Navbar, NavbarToggler, NavbarBrand, Collapse, NavItem, NavLink, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Languages } from "../shared/Enums";
import i18n from "../i18n";

type myProps = {

}

type myState = {
    isNavOpen: boolean,
    isDropdownOpen: boolean,
}

export class HeaderComponent extends Component<myProps, myState> {

    constructor(props: myProps) {
        super(props);

        this.state = {
            isNavOpen: false,
            isDropdownOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleDrop = this.toggleDrop.bind(this);
    }

    toggleNav = () => {
        this.setState({
            isNavOpen: !this.state.isNavOpen,
        });
    }

    toggleDrop = () => {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen,
        });
    }

    changeLanguage = (l: string): void => {
        switch (l) {
            case Languages.en:
                i18n.changeLanguage("en");
                break;
            case Languages.fi:
                i18n.changeLanguage("fi");
                break;
            default:
                i18n.changeLanguage("en");
                break;
        }
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto " href="/">
                            <img src='assets/images/logo.png' height="30" width="41" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg">Home</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/">
                                        <span className="fa fa-info fa-lg">About Us</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/">
                                        <span className="fa fa-list fa-lg">Menu</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem >
                                    <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.toggleDrop}>
                                        <DropdownToggle>
                                            <span className="fa fa-globe fa-lg">Language</span>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={() => this.changeLanguage(Languages.en)}>
                                                {Languages.en}</DropdownItem>
                                            <DropdownItem onClick={() => this.changeLanguage(Languages.fi)}>
                                                {Languages.fi}</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}