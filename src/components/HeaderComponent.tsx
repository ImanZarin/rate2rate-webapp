import { Component } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Nav, Navbar, NavbarToggler, NavbarBrand, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Languages } from "../shared/Enums";
import i18n from "../i18n";
import '../styles/header.scss';

type MyProps = {

}

type MyState = {
    isNavOpen: boolean;
    isDropdownOpen: boolean;
}

export class HeaderComponent extends Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props);

        this.state = {
            isNavOpen: false,
            isDropdownOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleDrop = this.toggleDrop.bind(this);
    }

    toggleNav = (): void => {
        this.setState({
            isNavOpen: !this.state.isNavOpen,
        });
    }

    toggleDrop = (): void => {
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

    render(): JSX.Element {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto " href="/">
                            <img src='assets/images/logo.png' alt="logo" height="30" width="41" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg title">Home</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/">
                                        <span className="fa fa-info fa-lg title">About Us</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/">
                                        <span className="fa fa-list fa-lg title">Menu</span>
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
                                            <DropdownItem onClick={(): void => this.changeLanguage(Languages.en)}>
                                                {Languages.en}</DropdownItem>
                                            <DropdownItem onClick={(): void => this.changeLanguage(Languages.fi)}>
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