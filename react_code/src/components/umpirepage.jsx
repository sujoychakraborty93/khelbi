import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UmpireTblClass from "./tables/umpireTbl";
// import NavbarDispClass from "./navbarTop";
// import NavbarFooterClass from "./navbarFooter";
// import AddBtnClass from "./addBtn";

class UmpireClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "Umpire List",
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
        <UmpireTblClass
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

export default withRouter(UmpireClass);
