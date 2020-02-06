import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  //   NavbarBrand,
  Nav,
  NavItem,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";
import { Form, FormControl, Button, Image } from "react-bootstrap";
import ball from "../images/ball33.png";
import { NavLink as RouteNavLink, withRouter } from "react-router-dom";
import axios from "axios";
import auth from "./auth";

class NavbarDispClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navbarOpen: false,
      userEmail: this.props.location.state.userEmail
      // matchActive: this.props.matchActive,
      // homeActive: this.props.homeActive,
      // requestActive: this.props.requestActive
    };
  }

  toggleNavbar = () => {
    this.setState({
      navbarOpen: !this.state.navbarOpen
    });
  };

  logout = () => {
    axios
      // .post(process.env.REACT_APP_POST_LOGOUT)
      .get(process.env.REACT_APP_GET_LOGOUT, { withCredentials: true })
      .then(res => {
        // if (res.status === 200) {
        // this.props.history.push("/login");
        // console.log("in logout");
        auth.setFalse();
        // return <Redirect to="/login" />;
        // window.location.href = `/login`;
        this.props.history.replace("/login");
        // } else {
        // console.log("error while logging out", res.status);
        // }
      });
  };

  // componentDidMount(){
  //   this.setState({
  //     allMatchSchedule: "/allMatchSchedule/" + this.state.userEmail
  //   })
  // }

  // activeLink = props => {
  //   if (props === "home") {
  //     this.setState({ homeActive: true });
  //   }
  //   if (props === "match") {
  //     this.setState({ matchActive: true });
  //   }
  //   if (props === "request") {
  //     this.setState({ requestActive: true });
  //   }
  // };

  render() {
    // this.activeLink(this.props.value);
    // console.log("this.props from navbartop");
    // console.log(this.props);
    //
    // {
    //   this.props.value === "home"
    //     ? this.setState({ homeActive: true })
    //     : this.props.value === "match"
    //     ? this.setState({ matchActive: true })
    //     : this.props.value === "request"
    //     ? this.setState({ requestActive: true })
    //     : this.setState({ homeActive: true });
    // }
    return (
      //   <Navbar color="light" light expand="md">
      <Navbar color="dark" dark expand="md" fixed="top">
        <NavbarBrand
          // style={{ color: "rgba(255, 255, 255, 0.9)" }}
          href="/home"
        >
          {/* <img src={ball} alt="CRICEXTRA" />*/}
          <Image
            src={ball}
            alt="CRICEXTRA"
            roundedCircle
            height="50px"
            width="50px"
          />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={this.state.navbarOpen} navbar>
          {/* <Nav className="ml-auto" navbar> */}
          <Nav className="mr-auto" navbar>
            <NavItem>
              {/* <NavLink
                //   taken care by <Navbar> tag 'dark' property, not the color=dark but dark property.
                // style={{ color: "rgba(255, 255, 255, 0.9)" }}
                href="/"
                active={this.state.homeActive}
              >
                Home
              </NavLink> */}
              <RouteNavLink
                className="nav-link"
                activeClassName="active"
                // activeStyle={{ color: "red" }}
                to={{
                  pathname: "/home",
                  state: { userEmail: this.state.userEmail }
                }}
                exact
              >
                Home
              </RouteNavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle
                //   taken care by <Navbar> tag 'dark' property, not the color=dark but dark property.
                // style={{ color: "rgba(255, 255, 255, 0.9)" }}
                nav
                caret
              >
                Schedule
              </DropdownToggle>
              <DropdownMenu
                // style={{ backgroundColor: "rgba(55, 55, 55, 1.0)" }}
                right
              >
                <DropdownItem
                // style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  <RouteNavLink
                    className="nav-link"
                    activeClassName="active"
                    // activeStyle={{ color: "red" }}
                    // to={"/allMatchSchedule/" + this.state.userEmail}
                    to={{
                      pathname: "/allMatchSchedule",
                      state: { userEmail: this.state.userEmail }
                    }}
                    exact
                  >
                    All Matches
                  </RouteNavLink>
                </DropdownItem>
                <DropdownItem
                // style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  {/* <NavLink
                    href="/myTeamSchedule"
                    active={this.state.matchActive}
                  >
                    My Team Matches
                  </NavLink> */}
                  <RouteNavLink
                    className="nav-link"
                    activeClassName="active"
                    // activeStyle={{ color: "red" }}
                    to={{
                      pathname: "/myTeamSchedule",
                      state: { userEmail: this.state.userEmail }
                    }}
                    exact
                  >
                    My Team Matches
                  </RouteNavLink>
                </DropdownItem>
                {/* <DropdownItem divider /> */}
                {/* <DropdownItem
                // style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  Reset
                </DropdownItem> */}
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <RouteNavLink
                className="nav-link"
                activeClassName="active"
                // activeStyle={{ color: "red" }}
                to={{
                  pathname: "/teamsList",
                  state: { userEmail: this.state.userEmail }
                }}
              >
                Teams
              </RouteNavLink>
            </NavItem>
            <NavItem>
              <RouteNavLink
                className="nav-link"
                activeClassName="active"
                // activeStyle={{ color: "red" }}
                // to={"/venuesList/" + this.state.userEmail}
                to={{
                  pathname: "/venuesList",
                  state: { userEmail: this.state.userEmail }
                }}
              >
                Venues
              </RouteNavLink>
            </NavItem>
            {/* <NavItem>
              <RouteNavLink
                className="nav-link"
                activeClassName="active"
                // activeStyle={{ color: "red" }}
                // to={"/venuesList/" + this.state.userEmail}
                to={{
                  pathname: "/requests",
                  state: { userEmail: this.state.userEmail }
                }}
              >
                Requests
              </RouteNavLink>
            </NavItem> */}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle
                //   taken care by <Navbar> tag 'dark' property, not the color=dark but dark property.
                // style={{ color: "rgba(255, 255, 255, 0.9)" }}
                nav
                caret
              >
                Requests
              </DropdownToggle>
              <DropdownMenu
                // style={{ backgroundColor: "rgba(55, 55, 55, 1.0)" }}
                right
              >
                <DropdownItem
                // style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  <RouteNavLink
                    className="nav-link"
                    activeClassName="active"
                    // activeStyle={{ color: "red" }}
                    // to={"/allMatchSchedule/" + this.state.userEmail}
                    to={{
                      pathname: "/requestOverview",
                      state: { userEmail: this.state.userEmail }
                    }}
                    exact
                  >
                    Requests Overview
                  </RouteNavLink>
                </DropdownItem>
                <DropdownItem
                // style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  {/* <NavLink
                    href="/myTeamSchedule"
                    active={this.state.matchActive}
                  >
                    My Team Matches
                  </NavLink> */}
                  <RouteNavLink
                    className="nav-link"
                    activeClassName="active"
                    // activeStyle={{ color: "red" }}
                    to={{
                      pathname: "/allRequest",
                      state: { userEmail: this.state.userEmail }
                    }}
                    exact
                  >
                    All Requests
                  </RouteNavLink>
                </DropdownItem>
                <DropdownItem
                // style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  {/* <NavLink
                    href="/myTeamSchedule"
                    active={this.state.matchActive}
                  >
                    My Team Matches
                  </NavLink> */}
                  <RouteNavLink
                    className="nav-link"
                    activeClassName="active"
                    // activeStyle={{ color: "red" }}
                    to={{
                      pathname: "/myRequest",
                      state: { userEmail: this.state.userEmail }
                    }}
                    exact
                  >
                    My Requests
                  </RouteNavLink>
                </DropdownItem>
                <DropdownItem
                // style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  <RouteNavLink
                    className="nav-link"
                    activeClassName="active"
                    // activeStyle={{ color: "red" }}
                    // to={"/allMatchSchedule/" + this.state.userEmail}
                    to={{
                      pathname: "/submitRequest",
                      state: { userEmail: this.state.userEmail }
                    }}
                    exact
                  >
                    Submit Request
                  </RouteNavLink>
                </DropdownItem>
                {/* <DropdownItem divider /> */}
                {/* <DropdownItem
                // style={{ color: "rgba(255, 255, 255, 0.9)" }}
                >
                  Reset
                </DropdownItem> */}
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <RouteNavLink
                className="nav-link"
                activeClassName="active"
                // activeStyle={{ color: "red" }}
                // to={"/umpiresList/" + this.state.userEmail}
                to={{
                  pathname: "/umpiresList",
                  state: { userEmail: this.state.userEmail }
                }}
              >
                Umpires
              </RouteNavLink>
            </NavItem>
            <NavItem>
              <RouteNavLink
                className="nav-link"
                activeClassName="active"
                // activeStyle={{ color: "red" }}
                // to={"/playersList/" + this.state.userEmail}
                to={{
                  pathname: "/playersList/",
                  state: { userEmail: this.state.userEmail }
                }}
              >
                Players
              </RouteNavLink>
            </NavItem>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
          <Button variant="outline-info" className="ml-2" onClick={this.logout}>
            Profile
          </Button>
          <Button variant="outline-info" className="ml-2" onClick={this.logout}>
            Logout
          </Button>
        </Collapse>
      </Navbar>
    );
  }

  //   navbarDisplay = () => {
  //     return (
  //       <Navbar color="light" light expand="md">
  //         <NavbarBrand href="/">CricExtra</NavbarBrand>
  //         <NavbarToggler onClick={this.toggleNavbar} />
  //         <Collapse isOpen={this.state.navbarOpen} navbar>
  //           <Nav className="ml-auto" navbar>
  //             <NavItem>
  //               <NavLink href="/components/">Components</NavLink>
  //             </NavItem>
  //             <NavItem>
  //               <NavLink href="https://github.com/reactstrap/reactstrap">
  //                 GitHub
  //               </NavLink>
  //             </NavItem>
  //             <UncontrolledDropdown nav inNavbar>
  //               <DropdownToggle nav caret>
  //                 Options
  //               </DropdownToggle>
  //               <DropdownMenu right>
  //                 <DropdownItem>Option 1</DropdownItem>
  //                 <DropdownItem>Option 2</DropdownItem>
  //                 <DropdownItem divider />
  //                 <DropdownItem>Reset</DropdownItem>
  //               </DropdownMenu>
  //             </UncontrolledDropdown>
  //           </Nav>
  //         </Collapse>
  //       </Navbar>
  //     );
  //   };
}

export default withRouter(NavbarDispClass);
