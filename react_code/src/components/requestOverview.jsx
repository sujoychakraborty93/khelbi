import React, { Component } from "react";
import NavbarDispClass from "./navbarTop";
import NavbarFooterClass from "./navbarFooter";
// import RequestSubmitTblClass from "./tables/requestSubmitTbl";
// import RequestAllTblClass from "./tables/requestAllTbl";
// import RequestMyTblClass from "./tables/requestMyTbl";
import RequestOverviewTblClass from "./tables/requestOverviewTbl";
import { withRouter } from "react-router-dom";

class RequestOverviewClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "Requests Overview",
      userEmail: this.props.location.state.userEmail
    };
  }
  render() {
    return (
      <div id="pageTop">
        <NavbarDispClass userEmail={this.state.userEmail} />
        <RequestOverviewTblClass
          header={this.state.header}
          userEmail={this.state.userEmail}
        />
        {/* <RequestAllTblClass userEmail={this.state.userEmail} />
        <RequestMyTblClass userEmail={this.state.userEmail} />
        <RequestSubmitTblClass userEmail={this.state.userEmail} /> */}
        <a href="#pageTop">
          <div className="topBtn">Top</div>
        </a>
        <NavbarFooterClass />
      </div>
    );
  }
}

export default withRouter(RequestOverviewClass);
