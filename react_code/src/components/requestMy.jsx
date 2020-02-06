import React, { Component } from "react";
import RequestMyTblClass from "./tables/requestMyTbl";
import NavbarDispClass from "./navbarTop";
import NavbarFooterClass from "./navbarFooter";
import { withRouter } from "react-router-dom";

class RequestMyClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "My Requests",
      userEmail: this.props.location.state.userEmail
    };
  }
  render() {
    return (
      <div id="pageTop">
        <NavbarDispClass userEmail={this.state.userEmail} />
        <RequestMyTblClass
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

export default withRouter(RequestMyClass);
