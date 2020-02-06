import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Label, Input, Alert } from "reactstrap";
import axios from "axios";
import auth from "./auth";

class LoginClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValues: {
        nameEmail: "",
        namePassword: ""
      },
      userLogin: [],
      msg: "",
      errMsg: "sorry wrong username/password combination",
      emailIdErrMsg: "",
      passwordErrMsg: "",
      fireRedirect: false
    };
  }

  LoginForm() {
    return (
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4 login-h">Sign In</h3>
                    <this.alrt />
                    <form onSubmit={this.handleOnSubmit}>
                      <div className="form-label-group">
                        <Input
                          type="email"
                          id="inputEmail"
                          className="form-control"
                          placeholder="Email address"
                          required
                          autoFocus
                          name="nameEmail"
                          onChange={this.handleOnChange}
                        />
                        <Label for="inputEmail">Username (your email)</Label>
                        {/* <p className="validationMsg">
                          {this.state.emailIdErrMsg}
                        </p> */}
                      </div>

                      <div className="form-label-group">
                        <Input
                          type="password"
                          id="inputPassword"
                          className="form-control"
                          placeholder="Password"
                          required
                          name="namePassword"
                          onChange={this.handleOnChange}
                        />
                        <Label for="inputPassword">Password</Label>
                        <p className="validationMsg">
                          {this.state.passwordErrMsg}
                        </p>
                      </div>

                      {/* <div className="custom-control custom-checkbox mb-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck1"
                        />
                        <Label
                          className="custom-control-label"
                          for="customCheck1"
                        >
                          Remember password
                        </Label>
                      </div> */}
                      <button
                        className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                      >
                        Sign in
                      </button>
                      <div className="text-center">
                        <a className="small" href="/forgotPassword">
                          Forgot password?
                        </a>
                        <br />
                        <a className="small" href="/register">
                          New User? Register/Create Account
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  alrt = () => {
    if (this.state.msg !== "") {
      let m = <Alert color="info">{this.state.msg}</Alert>;
      return m;
    } else {
      return null;
    }
  };

  handleOnSubmit = e => {
    e.preventDefault();
    if (this.validate(this.state.nameValues)) {
      // console.log("email id is valid");
      // console.log(this.state.nameValues.nameEmail);
      axios
        .post(process.env.REACT_APP_POST_LOGIN, this.state.nameValues, {
          withCredentials: true
        })
        .then(res => {
          // console.log("inside then");
          // console.log(res.status);
          auth.setTrue();
          // console.log(this.props);
          // console.log("inside then");
          // window.location.href = `/Home/${this.state.nameValues.nameEmail}`;
          // window.location.href = `/home`;
          // return <Redirect to={{ pathname: "/home" }} />;
          this.props.history.push({
            pathname: "/home",
            state: { userEmail: this.state.nameValues.nameEmail.toLowerCase() }
          });
          // this.setState({
          //   fireRedirect: true
          // });

          //   axios
          //     .get(process.env.REACT_APP_GET_USER_LOGIN, {
          //       params: {
          //         email_id: this.state.addDetails.emailId
          //       }
          //     })
          //     .then(res => {
          //       this.setState({
          //         userLogin: res.data,
          //         userid: res.data[0].id.toString(),
          //         page: "homepage"
          //       });
          //     });

          //   open a new tab
          //   window.open("/Home");
          //   opens in a new window
          //   window.open("/Home", "_blank", "toolbar=0,location=0,menubar=0");
          //   opens in a new window
          //   window.open("/Home", "windowName", "height=200,width=200");
          //   opens in self/same tab
          //   window.open("/Home", "_self");
          //   opens in self/same tab
          //   window.location.replace("/Home");
          //   opens in self/same tab
          //   window.location.href = `/Home/${this.state.addDetails.emailId}`;

          //   OPTION 2
          //   ReactDOM.createPortal(this.props.children, this.containerEl);
          //   this.externalWindow = window.open("", "_self");
          // this.containerEl = this.externalWindow.document.createElement('div');
          // this.externalWindow.document.body.appendChild(this.containerEl);
          //   this.externalWindow.document.body.appendChild(HomePageClass);
        })
        .catch(error => {
          this.setState({
            msg: this.state.errMsg + error
          });
        });
    }
  };

  handleOnChange = e => {
    e.preventDefault();
    let { name, value } = e.target;
    let { nameValues } = this.state;
    nameValues[name] = value;
    this.setState({ nameValues });
  };

  isValidEmail(email) {
    // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  hasValue(data) {
    return data !== undefined && data !== null && data !== "";
  }

  validate = data => {
    let emailIdErrMsg = "";
    let passwordErrMsg = "";

    // trim the text fields that are mandatory. non-mandatory may be null, so trim them after null validation.
    data.nameEmail = data.nameEmail.trim();
    // console.log("inside validate");

    // emailid validation
    if (
      !data.nameEmail ||
      data.nameEmail.length < 1 ||
      !isNaN(data.nameEmail) ||
      !this.isValidEmail(data.nameEmail)
    ) {
      emailIdErrMsg = "Please enter a valid email id (your username)!";
    }

    if (!this.hasValue(data.namePassword)) {
      passwordErrMsg = "password cannot be blank";
    }

    if (emailIdErrMsg || passwordErrMsg) {
      this.setState({
        emailIdErrMsg,
        passwordErrMsg
      });
      return false;
    }
    return true;
  };

  //   componentDidMount() {
  //     axios.get(process.env.REACT_APP_GET_USER_LOGIN).then(res => {
  //       this.setState({
  //         userLogin: res.data
  //       });
  //     });
  //   }

  render() {
    // console.log("this.state.fireRedirect");
    // console.log(this.state.fireRedirect);
    // if (this.state.fireRedirect) {
    //   console.log("this.state.fireRedirect inside if");
    //   console.log(this.state.fireRedirect);
    //   return <Redirect to={{ pathname: "/home" }} />;
    // }
    return <div>{this.LoginForm()}</div>;
  }
}

// export default LoginClass;
export default withRouter(LoginClass);
