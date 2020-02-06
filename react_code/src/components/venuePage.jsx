import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import VenueTblClass from "./tables/venueTbl";
// import NavbarDispClass from "./navbarTop";
// import NavbarFooterClass from "./navbarFooter";
// import AddBtnClass from "./addBtn";

class VenueClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "Venue List",
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
        <VenueTblClass
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

export default withRouter(VenueClass);
