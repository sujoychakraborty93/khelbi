import React, { Component } from "react";
import RequestDetailsTblClass from "./tables/requestDetailsTbl";

import NavbarDispClass from "./navbarTop";
import NavbarFooterClass from "./navbarFooter";
import { withRouter } from "react-router-dom";

class RequestDetailsClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "Request Details",
      userEmail: this.props.location.state.userEmail,
      requestId: this.props.match.params.id,
      requestData: this.props.location.state.requestData,
      msg: this.props.location.state.msg,
      comment: this.props.location.state.comment,
      user: this.props.location.state.user,
      requestTemplateList: this.props.location.state.requestTemplateList,
      sportTypeList: this.props.location.state.sportTypeList,
      matchList: this.props.location.state.matchList
    };
  }
  render() {
    return (
      <div id="pageTop">
        <NavbarDispClass userEmail={this.state.userEmail} />
        {/* <RequestDetailsTblClass */}
        <RequestDetailsTblClass
          header={this.state.header}
          userEmail={this.state.userEmail}
          requestId={this.state.requestId}
          requestData={this.state.requestData}
          msg={this.state.msg}
          comment={this.state.comment}
          user={this.state.user}
        />
        <a href="#pageTop">
          <div className="topBtn">Top</div>
        </a>
        <NavbarFooterClass />
      </div>
    );
  }
}

export default withRouter(RequestDetailsClass);
