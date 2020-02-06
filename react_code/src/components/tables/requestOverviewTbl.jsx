import React, { Component } from "react";
import RequestSubmitTblClass from "./requestSubmitTbl";
import RequestAllTblClass from "./requestAllTbl";
import RequestMyTblClass from "./requestMyTbl";
import { Alert } from "reactstrap";
class RequestOverviewTblClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: this.props.userEmail,
      header: "Requests Overview",
      msg: ""
    };
  }
  alrt = () => {
    if (this.state.msg !== "") {
      let m = <Alert color="info">{this.state.msg}</Alert>;
      return m;
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="container">
        <h1 className="pageHead">{this.state.header}</h1>
        <this.alrt />
        <div className="displayFlex">
          <div className="requestOverviewAllRequest mr-2 requestOverviewChild">
            <RequestAllTblClass userEmail={this.state.userEmail} />
          </div>
          <div className="requestOverviewMyRequest mr-2 requestOverviewChild">
            <RequestMyTblClass userEmail={this.state.userEmail} />
          </div>
          <div className="requestOverviewSubmitRequest requestOverviewChild">
            <RequestSubmitTblClass userEmail={this.state.userEmail} />
          </div>
        </div>
      </div>
    );
  }
}

export default RequestOverviewTblClass;
