import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TeamTblClass from "./tables/teamTbl";
// import NavbarDispClass from "./navbarTop";
// import NavbarFooterClass from "./navbarFooter";
// import AddBtnClass from "./addBtn";

class TeamsClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "Teams List",
      userEmail: this.props.location.state.userEmail
    };
  }

  render() {
    return (
      <div>
        {/* <NavbarDispClass
        // homeActive={false}
        // matchActive={false}
        // requestActive={false}
        /> */}
        {/* <div className="container"> */}
        {/* <h1 className="pageHead">{this.state.header}</h1> */}
        <TeamTblClass
          header={this.state.header}
          userEmail={this.state.userEmail}
        />
        {/* <AddBtnClass /> */}
        {/* </div> */}
        {/* <NavbarFooterClass /> */}
      </div>
    );
  }
}

export default withRouter(TeamsClass);
