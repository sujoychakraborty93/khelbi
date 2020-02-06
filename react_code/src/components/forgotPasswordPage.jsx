import React, { Component } from "react";
// import { Label } from "react-bootstrap";
import { Label } from "reactstrap";
import axios from "axios";

class ForgotPasswordClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoginList: []
    };
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_USER_LOGIN_LIST).then(res => {
      this.setState({
        userLoginList: res.data
      });
    });
  }

  render() {
    return (
      <div className="container-fluid fixed-top">
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Sign In</h3>
                    <form>
                      <div className="form-label-group">
                        <input
                          type="email"
                          id="inputEmail"
                          className="form-control"
                          placeholder="Email address"
                          required
                          autoFocus
                        />
                        <Label for="inputEmail">Email address</Label>
                      </div>

                      <div className="form-label-group">
                        <input
                          type="password"
                          id="inputPassword"
                          className="form-control"
                          placeholder="Password"
                          required
                        />
                        <Label for="inputPassword">Password</Label>
                      </div>

                      <div className="custom-control custom-checkbox mb-3">
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
                      </div>
                      <button
                        className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                      >
                        Sign in
                      </button>
                      <div className="text-center">
                        {/* <a className="small" href="#">
                          Forgot password?
                        </a>
                        <br /> */}
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
}

export default ForgotPasswordClass;
