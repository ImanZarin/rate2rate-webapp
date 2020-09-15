// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Component, EventHandler, ChangeEvent } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Nav, Navbar, NavbarToggler, NavbarBrand, Collapse, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Input, InputGroup, InputGroupAddon, InputGroupText, Alert } from "reactstrap";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import { Languages } from "../../shared/Enums";
import i18n from "../../i18n";
import './header.scss';
import { User, IMDBsearch } from "../../shared/dto.models";
import { MyFetch } from "../../shared/my-fetch";

type MyProps = {
    lan: Languages;
    user: User;
    isLoggedin?: boolean;
    changeLan: (l: Languages) => void;
    changeUser: (u: User) => void;
    logout: () => void;
    changePage: (p: string) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    translate: any;
}

type MyState = {
    isNavOpen: boolean;
    isDropdownOpen: boolean;
    searchText: string;
    isLoading: boolean;
    searchResult: IMDBsearch[];
    alertIsOpen: boolean;
    error: Error;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class HeaderComponent extends Component<MyProps & RouteComponentProps<any>, MyState> {
    myfetchObjet = new MyFetch();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(props: MyProps & RouteComponentProps<any>) {
        super(props);

        this.state = {
            isNavOpen: false,
            isDropdownOpen: false,
            searchText: "",
            isLoading: false,
            searchResult: [],
            error: new Error,
            alertIsOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleDrop = this.toggleDrop.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
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

    onSignin = (): void => {
        this.props.changePage(this.props.history.location.pathname);
        if (this.props.isLoggedin)
            this.props.history.push("/profile");
        else
            this.props.history.push("/signin");
    }

    onSearchChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            searchText: e.target.value
        })
    }

    onSearchSubmit = (): void => {
        if (this.state.searchText.length < 1)
            return;
        this.setState({
            isLoading: true
        });
        this.props.history.push("/search/" + this.state.searchText);
    }


    render(): JSX.Element {
        return (
            <React.Fragment>
                <Navbar dark expand="md" className="header">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} className="my-navbar-toggler" />
                        <NavbarBrand className="mr-auto " href="/">
                            <img src='/assets/images/logo.png' alt="logo" height="42" width="42"
                                onClick={() => this.props.history.push("/home")} />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            {/* <Nav navbar>
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
                            </Nav> */}
                            <Nav className="ml-auto" navbar>
                                <NavItem className="my-nav-item">
                                    <InputGroup style={{ marginTop: "0.5rem" }}>
                                        <InputGroupAddon addonType="prepend">
                                            <button className="fa fa-search btn btn-search"
                                                onClick={this.onSearchSubmit}>
                                            </button>
                                        </InputGroupAddon>
                                        <Input
                                            onChange={this.onSearchChange}
                                            placeholder={this.props.translate("header-search-placeholder")}
                                            onKeyPress={(event) => {
                                                if (event.key === "Enter") {
                                                    this.onSearchSubmit();
                                                }
                                            }} />
                                    </InputGroup>
                                </NavItem>
                                <NavItem className="my-nav-item">
                                    <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.toggleDrop}>
                                        <DropdownToggle className="dropdown">
                                            <div className="dropdown-container">
                                                <span className="fa fa-globe fa-2x" />
                                                <span style={{ verticalAlign: "super" }}>  Language</span>
                                            </div>
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem onClick={(): void => this.myChangeLanguage(Languages.en)}>
                                                {Languages.en}</DropdownItem>
                                            <DropdownItem onClick={(): void => this.myChangeLanguage(Languages.fi)}>
                                                {Languages.fi}</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </NavItem>
                                <NavItem className="my-nav-item">
                                    <button className="btn-right" onClick={() => this.onSignin()}>
                                        {this.props.isLoggedin ? this.props.user.username : this.props.translate("header-signin-button")}
                                    </button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default withRouter(HeaderComponent);