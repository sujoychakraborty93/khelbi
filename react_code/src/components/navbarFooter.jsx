import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithubAlt,
  faGoogle,
  faFacebook,
  faTwitter,
  faLinkedinIn
} from "@fortawesome/free-brands-svg-icons";

class NavbarFooterClass extends Component {
  state = {};
  render() {
    return (
      // <Navbar fixed="bottom" bg="dark" variant="dark" >
      <Navbar bg="dark" variant="dark" className="jumbotron">
        {/* <Navbar.Brand href="/">CRICEXTRA</Navbar.Brand> */}
        <div
          // className="ml-auto"
          className="navFoot navFootGroup"
        >
          <Nav.Link href="/">Our Team</Nav.Link>
          <Nav.Link href="/">About Us</Nav.Link>
          <Nav.Link href="/">Contact Us</Nav.Link>
        </div>
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form> */}
        {/* <Form inline>
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faGithubAlt} />
          <FontAwesomeIcon icon={faTwitter} />
          <FontAwesomeIcon icon={faLinkedinIn} />
          <FontAwesomeIcon icon={faGoogle} />
        </Form> */}
        <div className="navFootGroup">
          <FontAwesomeIcon icon={faFacebook} className="iconCls" />
          <FontAwesomeIcon icon={faGithubAlt} className="iconCls" />
          <FontAwesomeIcon icon={faTwitter} className="iconCls" />
          <FontAwesomeIcon icon={faLinkedinIn} className="iconCls" />
          <FontAwesomeIcon icon={faGoogle} className="iconCls" />
        </div>
      </Navbar>
    );
  }
}

export default NavbarFooterClass;
