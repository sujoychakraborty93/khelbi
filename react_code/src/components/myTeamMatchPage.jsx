import React, { Component } from "react";

import MatchScheduleTblClass from "./tables/matchScheduleTbl";
// import NavbarDispClass from "./navbarTop";
// import NavbarFooterClass from "./navbarFooter";
// import { Alert } from "reactstrap";
// import AddBtnClass from "./addBtn";
import { withRouter } from "react-router-dom";

class MyTeamMatchPageClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "My Team Schedule",
      userEmail: this.props.location.state.userEmail
      // this.props.location.state.userEmail ||
      // this.props.location.state.userEmail.length > 0
      //   ? ""
      //   : this.props.location.state.userEmail
      // message: ""
    };
  }

  // messageFromChild = message => {
  //   // this.forceUpdate();
  //   this.setState({
  //     message: message
  //   });
  //   return <Alert color="info">{message}</Alert>;
  // };
  // alrt = () => {
  //   if (this.state.message !== "") {
  //     return <Alert color="info">{this.state.message}</Alert>;
  //   } else {
  //     return null;
  //   }
  // };

  render() {
    console.log("this.props from my match schedule page");
    console.log(this.props);
    return (
      <div>
        {/* <NavbarDispClass
        // homeActive={false}
        // matchActive={false}
        // requestActive={false}
        /> */}
        {/* <div className="container"> */}
        {/* <h1 className="pageHead">{this.state.header}</h1> */}
        {/* <this.alrt /> */}
        <MatchScheduleTblClass
          // matchesLink={process.env.REACT_APP_MY_TEAM_MATCHES}
          matchesLink={process.env.REACT_APP_MY_TEAM_MATCHES}
          header={this.state.header}
          userEmail={this.state.userEmail}
          // fetchmessage={this.messageFromChild}
        />
        {/* <AddBtnClass /> */}
        {/* </div> */}
        {/* <NavbarFooterClass /> */}
      </div>
    );
  }
}

export default withRouter(MyTeamMatchPageClass);
