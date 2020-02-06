import React, { Component } from "react";
import PlayerTblClass from "./tables/playerTbl";
import PlayerDetailsClass from "./tables/playerDetailsTbl";
import { withRouter } from "react-router-dom";

class PlayerClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: "Player List",
      userEmail: this.props.location.state.userEmail
      // userId: this.props.match.params.userId
      // emailId: this.props.match.params.emailId
    };
  }

  render() {
    // console.log(this.props);
    if (
      !this.props.match.params.playerEmailId ||
      this.props.match.params.playerEmailId === ""
    ) {
      // if (
      //   this.props.match.url
      //     // .replace(this.props.match.params.userId, "")
      //     .replace(this.props.match.params.emailId, "")
      //     .replace(/\//g, "") === "playersList"
      // ) {
      return (
        // <div>
        // {/* <NavbarDispClass
        // homeActive={false}
        // matchActive={false}
        // requestActive={false}
        // /> */}
        // {/* <div className="container"> */}
        // {/* <h1 className="pageHead">{this.state.header}</h1> */}
        // <PlayerTblClass header={this.state.header} userId={this.state.userId} />
        <PlayerTblClass
          header={this.state.header}
          userEmail={this.state.userEmail}
        />
        // {/* <AddBtnClass /> */}
        // {/* </div> */}
        // {/* <NavbarFooterClass /> */}
        // </div>
      );
    } else {
      return (
        <PlayerDetailsClass
          header={"Player Details"}
          userEmail={this.state.userEmail}
          playerEmailId={this.props.match.params.playerEmailId}
        />
      );
    }
  }
}

export default withRouter(PlayerClass);
