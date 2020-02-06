import React, { Component } from "react";
// import ReactDOM from "react-dom";
// import { Label } from "react-bootstrap";
import { Label, Input, Alert } from "reactstrap";
import axios from "axios";
// import HomePageClass from "./homePage";

class RegistrationClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addDetails: {
        firstName: "",
        lastName: "",
        middleName: "",
        emailId: "",
        fullName: "",
        teamId: null,
        phone: null,
        password: "",
        secretQid: null,
        secretA: "",
        created: "",
        modified: ""
      },
      nameValues: {
        nameFirstname: "",
        nameMiddlename: "",
        nameLastname: "",
        nameEmail: "",
        namePassword: "",
        nameConfirmPassword: "",
        nameSecretQ: "",
        nameSecretA: ""
      },

      firstNameErrMsg: "",
      lastNameErrMsg: "",
      middleNameErrMsg: "",
      emailIdErrMsg: "",
      passwordErrMsg: "",
      confirmPasswordErrMsg: "",
      secretQErrMsg: "",
      secretAErrMsg: "",
      msg: "",
      secretQList: [],
      playerList: [],
      userLogin: [],
      userid: ""
      //   page: "registration"
      //   externalWindow: null,
      //   containerEl: null
    };
  }

  RegistrationForm() {
    return (
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div className="col-md-8 col-lg-6">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-md-9 col-lg-8 mx-auto">
                    <h3 className="login-heading mb-4">Register</h3>
                    <this.alrt />
                    <form onSubmit={this.handleOnSubmit}>
                      <div className="form-label-group">
                        <Input
                          type="text"
                          id="inputFirstname"
                          className="form-control"
                          placeholder="First Name"
                          required
                          autoFocus
                          name="nameFirstname"
                          onChange={this.handleOnChange}
                        />
                        <Label for="inputFirstname">First Name</Label>
                        <p className="validationMsg">
                          {this.state.firstNameErrMsg}
                        </p>
                      </div>
                      <div className="form-label-group">
                        <Input
                          type="text"
                          id="inputMiddlename"
                          className="form-control"
                          placeholder="Middle Name"
                          autoFocus
                          name="nameMiddlename"
                          onChange={this.handleOnChange}
                        />
                        <Label for="inputMiddlename">Middle Name</Label>
                        <p className="validationMsg">
                          {this.state.middleNameErrMsg}
                        </p>
                      </div>
                      <div className="form-label-group">
                        <Input
                          type="text"
                          id="inputLastname"
                          className="form-control"
                          placeholder="Last Name"
                          autoFocus
                          name="nameLastname"
                          onChange={this.handleOnChange}
                        />
                        <Label for="inputLastname">Last Name</Label>
                        <p className="validationMsg">
                          {this.state.lastNameErrMsg}
                        </p>
                      </div>
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
                        <Label for="inputEmail">Email address</Label>
                        <p className="validationMsg">
                          {this.state.emailIdErrMsg}
                        </p>
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
                      <div className="form-label-group">
                        <Input
                          type="password"
                          id="inputConfirmPassword"
                          className="form-control"
                          placeholder="Confirm Password"
                          required
                          name="nameConfirmPassword"
                          onChange={this.handleOnChange}
                        />
                        <Label for="inputConfirmPassword">
                          Confirm Password
                        </Label>
                        <p className="validationMsg">
                          {this.state.confirmPasswordErrMsg}
                        </p>
                      </div>
                      <div className="form-label-group">
                        <Input
                          type="select"
                          id="selectSecretQues"
                          className="form-control"
                          //   placeholder="Last Name"
                          required
                          autoFocus
                          name="nameSecretQ"
                          onChange={this.handleOnChange}
                        >
                          <option key="0" value="--Select--">
                            --Select Secret Question--
                          </option>
                          {this.state.secretQList.map(s => (
                            <option key={s.id} value={s.id}>
                              {s.question}
                            </option>
                          ))}
                        </Input>
                        {/* <Label for="selectSecretQues">Secret Question</Label> */}
                        <p className="validationMsg">
                          {this.state.secretQErrMsg}
                        </p>
                      </div>
                      <div className="form-label-group">
                        <Input
                          type="text"
                          id="inputSecretA"
                          className="form-control"
                          placeholder="Secret Answer"
                          required
                          name="nameSecretA"
                          onChange={this.handleOnChange}
                        />
                        <Label for="inputSecretA">Secret Answer</Label>
                        <p className="validationMsg">
                          {this.state.secretAErrMsg}
                        </p>
                      </div>

                      <button
                        className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                      >
                        Sign in
                      </button>
                      <div className="text-center">
                        <a className="small" href="/login">
                          Existing User? Login Here
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
      let { addDetails } = this.state;
      let { nameValues } = this.state;
      addDetails.firstName = nameValues.nameFirstname;
      addDetails.lastName = nameValues.nameMiddlename;
      addDetails.middleName = nameValues.nameLastname;
      addDetails.emailId = nameValues.nameEmail.toLowerCase();
      addDetails.password = nameValues.namePassword;
      addDetails.confirmPassword = nameValues.nameConfirmPassword;
      addDetails.secretQid = nameValues.nameSecretQ;
      addDetails.secretA = nameValues.nameSecretA;
      addDetails.teamId = null;
      addDetails.fullName = addDetails.firstName;
      if (this.hasValue(addDetails.middleName)) {
        addDetails.fullName += " " + addDetails.middleName;
      }
      if (this.hasValue(addDetails.lastName)) {
        addDetails.fullName += " " + addDetails.lastName;
      }
      let d = new Date();
      // let date =
      //   d.getFullYear() +
      //   "-" +
      //   (d.getMonth() + 1) +
      //   "-" +
      //   d.getDate() +
      //   " " +
      //   d.toTimeString();
      // date = date.slice(0, 19);
      let date = d.toUTCString();
      addDetails.created = date;
      addDetails.modified = date;

      this.setState({ addDetails });
      axios
        .post(process.env.REACT_APP_ADD_NEW_PLAYER, this.state.addDetails)
        .then(res => {
          this.setState({
            msg:
              res.status === 200
                ? this.state.addMsg
                : "status code " + res.status + "\n" + this.state.errMsg
          });

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
          window.location.href = `/Home/${this.state.addDetails.emailId}`;

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

  isValidName(str) {
    // return !/[~`!#$%\^&*+=\-\[\]\\';,/{@}|\\":<>\?]/g.test(str);
    return (
      //   !/[~`!$%^*+=[\]\\';,/{}()@-_&#:|\\"<>?]/g.test(str) && str.match(/[a-z]/i)
      str.match(/^[A-Za-z.\s]+$/i)
      //   str.match(/^\w+(\s)?\w+$/i)
    );
  }
  isValidEmail(email) {
    // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  isValidPhone(phone) {
    // '(^\+)?'checks if 1st char is '+' and this is opional. '[0-9]+' checks rest of the chars should be digit
    // var re = /(^\+)?[0-9]+/;
    // var re = /(^\+)?\d+/;   // same as above replaced '[0-9]' with '\d'
    var re = /[0-9]+/; // checks if its a number
    return re.test(phone);
  }
  isValidPassword(str) {
    // return str.match(/[A-Za-z0-9.@#&*!]+/i);
    // return str.match(/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/);
    return str.match(
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])(?=.{6,})/
    );
  }
  isValidAnswer(str) {
    return str.match(/^[A-Za-z\s]+$/i);
  }
  hasValue(data) {
    return data !== undefined && data !== null && data !== "";
  }

  validate = data => {
    let firstNameErrMsg = "";
    let middleNameErrMsg = "";
    let lastNameErrMsg = "";
    let emailIdErrMsg = "";
    let passwordErrMsg = "";
    let confirmPasswordErrMsg = "";
    let secretQErrMsg = "";
    let secretAErrMsg = "";

    // trim the text fields that are mandatory. non-mandatory may be null, so trim them after null validation.
    data.nameFirstname = data.nameFirstname.trim();
    data.nameEmail = data.nameEmail.trim();

    // first name validation

    if (
      !data.nameFirstname ||
      data.nameFirstname.length < 1 ||
      !isNaN(data.nameFirstname) ||
      !this.isValidName(data.nameFirstname)
    ) {
      firstNameErrMsg =
        "At least one alphabet is required. No special characters or numbers allowed";
    }

    // middle name validation
    if (this.hasValue(data.nameMiddlename)) {
      data.nameMiddlename = data.nameMiddlename.trim();
      if (
        !isNaN(data.nameMiddlename) ||
        !this.isValidName(data.nameMiddlename)
      ) {
        middleNameErrMsg = "No special characters or numbers allowed";
      }
    }

    // last name validation
    if (this.hasValue(data.nameLastname)) {
      data.nameLastname = data.nameLastname.trim();
      if (!isNaN(data.nameLastname) || !this.isValidName(data.nameLastname)) {
        lastNameErrMsg = "No special characters or numbers allowed";
      }
    }

    // emailid validation
    if (
      !data.nameEmail ||
      data.nameEmail.length < 1 ||
      !isNaN(data.nameEmail) ||
      !this.isValidEmail(data.nameEmail)
    ) {
      emailIdErrMsg = "Please enter a valid email id!";
    } else {
      if (
        this.state.playerList.filter(p => p.email_id === data.nameEmail)
          .length > 0
      ) {
        emailIdErrMsg =
          data.nameEmail + " is already taken. Please try a different email Id";
      }
    }

    // password validation
    if (this.hasValue(data.namePassword)) {
      data.namePassword = data.namePassword.trim();
      if (!this.isValidPassword(data.namePassword)) {
        passwordErrMsg = "please enter a valid password";
      }
    } else {
      passwordErrMsg = "password cannot be blank";
    }

    // confirm password validation
    if (this.hasValue(data.nameConfirmPassword)) {
      data.nameConfirmPassword = data.nameConfirmPassword.trim();
      if (data.namePassword !== data.nameConfirmPassword) {
        confirmPasswordErrMsg = "password should match";
      }
    } else {
      confirmPasswordErrMsg = "confirm password field cannot be blank";
    }

    // secret question validation
    if (!this.hasValue(data.nameSecretQ) || data.nameSecretQ === "--Select--") {
      secretQErrMsg = "please select a question";
    }

    // secret answer validation
    if (this.hasValue(data.nameSecretA)) {
      data.nameSecretA = data.nameSecretA.trim();
      if (!this.isValidAnswer(data.nameSecretA)) {
        secretAErrMsg =
          "Only alphabates and space are allowed. No numbers, special characters allowed";
      }
    } else {
      secretAErrMsg = "Please enter a answer";
    }

    if (
      firstNameErrMsg ||
      middleNameErrMsg ||
      lastNameErrMsg ||
      emailIdErrMsg ||
      passwordErrMsg ||
      confirmPasswordErrMsg ||
      secretQErrMsg ||
      secretAErrMsg
    ) {
      this.setState({
        firstNameErrMsg,
        middleNameErrMsg,
        lastNameErrMsg,
        emailIdErrMsg,
        passwordErrMsg,
        confirmPasswordErrMsg,
        secretQErrMsg,
        secretAErrMsg
      });
      return false;
    }
    return true;
  };

  componentDidMount() {
    axios.get(process.env.REACT_APP_SECRET_QUESTION_LIST).then(res => {
      this.setState({
        secretQList: res.data
      });
    });
    axios.get(process.env.REACT_APP_PLAYER_LIST).then(res => {
      this.setState({
        playerList: res.data
      });
    });
  }

  render() {
    // let { page } = this.state;

    // switch (page) {
    //   case "registration":
    //     return this.RegistrationForm();
    //   //   case "homepage":
    //   // return <HomePageClass userid={this.state.userid} />;
    //   // return <HomePageClass emailId={this.state.addDetails.emailId} />;

    //   default:
    //     return this.RegistrationForm();
    // }
    return this.RegistrationForm();
  }
}

export default RegistrationClass;
