// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Nav, Navbar, NavbarToggler, NavbarBrand, Collapse, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NavLink } from 'react-router-dom';
import { Languages, Pages } from "../../shared/Enums";
import i18n from "../../i18n";
import './header.scss';

type MyProps = {
    lan: Languages;
    username: string;
    changeLan: (l: Languages) => void;
    changeName: (u: string) => void;
    translate: any;
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

    myChangeLanguage = (l: string): void => {
        switch (l) {
            case Languages.en:
                i18n.changeLanguage("en");
                this.props.changeLan(Languages.en);
                break;
            case Languages.fi:
                i18n.changeLanguage("fi");
                this.props.changeLan(Languages.fi);
                break;
            default:
                i18n.changeLanguage("en");
                this.props.changeLan(Languages.en);
                break;
        }
    }




    render(): JSX.Element {
        return (
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} className="my-navbar-toggler" />
                        <NavbarBrand className="mr-auto " href="/">
                            <img src='assets/images/logo.png' alt="logo" height="30" width="41" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to={Pages.home}>
                                        <span className="fa fa-home fa-lg title">Home</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to={Pages.signin}>
                                        <span className="fa fa-info fa-lg title">About Us</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to={Pages.user}>
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
                                            <DropdownItem onClick={(): void => this.myChangeLanguage(Languages.en)}>
                                                {Languages.en}</DropdownItem>
                                            <DropdownItem onClick={(): void => this.myChangeLanguage(Languages.fi)}>
                                                {Languages.fi}</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </NavItem>
                                <NavItem>
                                    <Button>
                                        {this.props.username?.length > 0 ? this.props.username : this.props.translate("header-signin-button")}
                                    </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}