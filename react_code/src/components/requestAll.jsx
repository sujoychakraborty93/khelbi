import React, { Component } from "react";
import RequestAllTblClass from "./tables/requestAllTbl";
import NavbarDispClass from "./navbarTop";
import NavbarFooterClass from "./navbarFooter";
import { withRouter } from "react-router-dom";

class RequestAllClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "All Requests",
      userEmail: this.props.location.state.userEmail
    };
  }
  render() {
    return (
      <div id="pageTop">
        <NavbarDispClass userEmail={this.state.userEmail} />
        <RequestAllTblClass
          header={this.state.header}
          userEmail={this.state.userEmail}
        />
        <a href="#pageTop">
          <div className="topBtn">Top</div>
        </a>
        <NavbarFooterClass />
      </div>
    );
  }
}

export default withRouter(RequestAllClass);
