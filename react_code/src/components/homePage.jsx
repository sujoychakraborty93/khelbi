import React, { Component } from "react";
import { withRouter } from "react-router-dom";

// import MatchScheduleTblClass from "./tables/matchScheduleTbl";
// import MyTeamMatchPageClass from "./myTeamMatchPage";
import RequestOverviewClass from "./requestOverview";
// import NavbarDispClass from "./navbarTop";
// import NavbarFooterClass from "./navbarFooter";
// import { Alert } from "reactstrap";
// import AddBtnClass from "./addBtn";

class HomePageClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // matchDetails: [],
      // header: "My Team Schedule",
      // emailId: this.props.emailId
      // userEmail: this.props.match.params.userEmail
      userEmail: this.props.location.state
        ? this.props.location.state.userEmail
        : ""
      // message: ""
      // dummyV: "before add/update"
    };
  }

  // ******instead of using constructor and super() to bind standalone functions, arrow functions can also be used
  // ******using constructor and super() to bind standalone functions
  // constructor() {
  //   super();
  //   this.toggleEditMatchModal = this.toggleEditMatchModal.bind(this);
  // }
  // ******using arrow functions
  // toggleEditMatchModal = () => {
  //   this.setState(prevState => ({
  //     editMatchModal: !prevState.editMatchModal
  //   }));
  // }
  // ****** or you can use .bind(this) in every time the function is called. e.g.
  // <ModalHeader toggle={this.toggleEditMatchModal.bind(this)}>

  // messageFromChild = message => {
  //   // this.forceUpdate();
  //   this.setState({
  //     message: message
  //   });
  //   // return <Alert color="info">{message}</Alert>;
  // };
  // alrt = () => {
  //   if (this.state.message !== "") {
  //     return <Alert color="info">{this.state.message}</Alert>;
  //   } else {
  //     return null;
  //   }
  // };

  // componentDidMount() {
  //   this.setState({ emailId: this.props.match.params });
  // }

  componentCalled = () => {
    return (
      <div>
        {this.props.history.push({
          pathname: "/myTeamSchedule",
          state: { userEmail: this.state.userEmail }
        })}
      </div>
    );
  };

  render() {
    // this.tbl = new tblHeaderClass();
    //this.nvbar = new NavbarDispClass();
    console.log("this.props from homepage");
    console.log(this.props);

    //return <h1>Hello WOrld</h1>;
    return (
      <div>
        {/* <NavbarDispClass
        // homeActive={false}
        // matchActive={false}
        // requestActive={false}
        /> */}
        {/* <div className="container"> */}
        {/* <h1 className="pageHead">{this.state.header}</h1> */}
        {/* <h5 className="lead ">{this.state.message}</h5> */}
        {/* <this.alrt /> */}
        {/* <MatchScheduleTblClass
          matchesLink={process.env.REACT_APP_MY_TEAM_MATCHES}
          header={this.state.header}
          // fetchmessage={this.messageFromChild}
          // dummyVar={this.state.dummyV}
        /> */}
        {/* <MyTeamMatchPageClass userEmail={this.state.userEmail} /> */}
        <RequestOverviewClass userEmail={this.state.userEmail} />
        {/* {this.componentCalled()} */}
        {/* <AddBtnClass /> */}
        {/* <p>{this.state.dummyV}</p> */}
        {/* </div> */}
        {/* <NavbarFooterClass /> */}
      </div>
    );
  }
}

export default withRouter(HomePageClass);
