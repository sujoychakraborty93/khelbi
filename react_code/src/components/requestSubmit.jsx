import React, { Component } from "react";
import RequestSubmitTblClass from "./tables/requestSubmitTbl";
import NavbarDispClass from "./navbarTop";
import NavbarFooterClass from "./navbarFooter";
import { withRouter } from "react-router-dom";

class RequestSubmitClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "Submit Request",
      userEmail: this.props.location.state.userEmail
    };
  }
  render() {
    // console.log("inside request submit, user email is ");
    // console.log(this.props);
    return (
      <div id="pageTop">
        <NavbarDispClass userEmail={this.state.userEmail} />
        <RequestSubmitTblClass
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

export default withRouter(RequestSubmitClass);
