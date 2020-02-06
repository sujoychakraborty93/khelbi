import React, { Component } from "react";

import MatchScheduleTblClass from "./tables/matchScheduleTbl";
// import NavbarDispClass from "./navbarTop";
// import NavbarFooterClass from "./navbarFooter";
// import { Alert } from "reactstrap";
// import AddBtnClass from "./addBtn";

class AllMatchesPageClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // matchDetails: [],
      header: "All Matches Schedule",
      // fromPage: "allMatchesPage",
      // fromPage: this.props.match.url
      //   .replace(this.props.match.params.param, "")
      //   .replace(/\//g, ""),
      userEmail: ""
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
    // console.log("i am here");
    // console.log(this.props);
    // console.log(this.state.fromPage);

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
          // matchesLink={process.env.REACT_APP_ALL_MATCHES}
          matchesLink={process.env.REACT_APP_ALL_MATCHES}
          header={this.state.header}
          userEmail={this.state.userEmail}
          // fromPage={this.state.fromPage}
          // fetchmessage={this.messageFromChild}
        />
        {/* <AddBtnClass /> */}
        {/* </div> */}
        {/* <NavbarFooterClass /> */}
      </div>
    );
  }
}

export default AllMatchesPageClass;
