import React, { Component } from "react";
import tblHeaderClass from "./createTableHeader";
import NavbarDispClass from "../navbarTop";
import NavbarFooterClass from "../navbarFooter";
import { Alert } from "reactstrap";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  // CustomInput,
  Input,
  Label
} from "reactstrap";
import { NavLink } from "react-router-dom";

class PlayerTblClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: this.props.userEmail,
      colHead: [
        // "Id",
        "Name",
        "Team",
        "Email ID",
        "Contact",
        "Umpire ID"
      ],
      columns: [
        "full_name",
        "team_name",
        "email_id",
        "contact_no",
        "umpire_id"
      ],
      editModalDisplay: false,
      deleteModalDisplay: false,
      addModalDisplay: false,
      filterModalDisplay: false,
      addDetails: {
        firstName: "",
        lastName: "",
        middleName: "",
        emailId: "",
        fullName: "",
        teamId: null,
        phone: null,
        password: "",
        confirmPassword: "",
        secretQid: null,
        secretA: "",
        created: "",
        modified: "",
        roleId: null
      },
      filterDetails: {
        emailId: "",
        fullName: "",
        teamId: null,
        roleId: null
      },

      editDetails: {
        id: null,
        firstName: "",
        lastName: "",
        middleName: "",
        emailId: "",
        fullName: "",
        teamId: null,
        phone: null,
        modified: "",
        roleId: null
      },
      modalData: {
        id: null,
        firstName: "",
        lastName: "",
        middleName: "",
        emailId: "",
        teamName: "",
        phone: "",
        roleId: null
      },
      modalDataOriginal: {
        id: null,
        firstName: "",
        lastName: "",
        middleName: "",
        emailId: "",
        teamName: "",
        phone: "",
        roleId: null
      },
      firstNameErrMsg: "",
      lastNameErrMsg: "",
      middleNameErrMsg: "",
      emailIdErrMsg: "",
      phoneErrMsg: "",
      passwordErrMsg: "",
      confirmPasswordErrMsg: "",
      secretQErrMsg: "",
      secretAErrMsg: "",

      teamList: [],
      playerList: [],
      filterPlayerList: [],
      userRoleList: [],
      secretQList: [],
      msg: "",
      addMsg: "New player added successfully!",
      errMsg: `Sorry we encountered an error. Please report below details to the admin using 
      Contact Us link at bottom of the page. Error code: `,
      updateMsg: "Player details updated successfully",
      delMsg: "Player deleted!",
      showAdd: false,
      showEdit: false,
      showDelete: false
    };
  }

  toggleEditModal() {
    this.setState(prevState => ({
      editModalDisplay: !prevState.editModalDisplay
    }));
    this.resetStates();
  }
  toggleDeleteModal() {
    this.setState(prevState => ({
      deleteModalDisplay: !prevState.deleteModalDisplay
    }));
    this.resetStates();
  }
  toggleAddModal() {
    this.setState(prevState => ({
      addModalDisplay: !prevState.addModalDisplay
    }));
    this.resetStates();
  }
  toggleFilterMatchModal() {
    this.setState(prevState => ({
      filterModalDisplay: !prevState.filterModalDisplay
    }));
    this.resetStates();
  }

  resetStates = () => {
    this.setState({
      firstNameErrMsg: "",
      lastNameErrMsg: "",
      middleNameErrMsg: "",
      emailNameErrMsg: "",
      phoneErrMsg: "",
      passwordErrMsg: "",
      confirmPasswordErrMsg: "",
      secretQErrMsg: "",
      secretAErrMsg: "",
      addDetails: {
        firstName: "",
        lastName: "",
        middleName: "",
        emailId: "",
        fullName: "",
        teamId: null,
        phone: "",
        created: "",
        modified: "",
        roleId: 4
      },
      filterDetails: {
        emailId: "",
        fullName: "",
        teamId: null,
        roleId: null
      }
    });
  };
  //   isValidString2(str) {
  //     var iChars = "~`!#$%^&*+=-[]\\';,/{}|\":<>?";
  //     if (!iChars.match(/\W/g) == "") {
  //       // alert ("File name has special characters ~`!#$%^&*+=-[]\\\';,/{}|\":<>? \nThese are not allowed\n");
  //       return false;
  //     }
  //     return true;
  //   }
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

  validate = (data, checkExtra) => {
    let firstNameErrMsg = "";
    let middleNameErrMsg = "";
    let lastNameErrMsg = "";
    let emailIdErrMsg = "";
    let phoneErrMsg = "";
    let passwordErrMsg = "";
    let confirmPasswordErrMsg = "";
    let secretQErrMsg = "";
    let secretAErrMsg = "";

    // trim the text fields that are mandatory. non-mandatory may be null, so trim them after null validation.
    data.firstName = data.firstName.trim();
    data.emailId = data.emailId.trim();

    // first name validation
    if (
      this.state.modalDataOriginal.firstName !== data.firstName ||
      this.state.modalDataOriginal.firstName === ""
    ) {
      if (
        !data.firstName ||
        data.firstName.length < 1 ||
        !isNaN(data.firstName) ||
        !this.isValidName(data.firstName)
      ) {
        firstNameErrMsg =
          "At least one alphabet is required. No special characters or numbers allowed";
      }
    }

    // middle name validation
    if (this.hasValue(data.middleName)) {
      data.middleName = data.middleName.trim();
      if (!isNaN(data.middleName) || !this.isValidName(data.middleName)) {
        middleNameErrMsg = "No special characters or numbers allowed";
      }
    }

    // last name validation
    if (this.hasValue(data.lastName)) {
      data.lastName = data.lastName.trim();
      if (!isNaN(data.lastName) || !this.isValidName(data.lastName)) {
        lastNameErrMsg = "No special characters or numbers allowed";
      }
    }

    // emailid validation
    if (
      this.state.modalDataOriginal.emailId !== data.emailId ||
      this.state.modalDataOriginal.emailId === ""
    ) {
      if (
        !data.emailId ||
        data.emailId.length < 1 ||
        !isNaN(data.emailId) ||
        !this.isValidEmail(data.emailId)
      ) {
        emailIdErrMsg = "Please enter a valid email id!";
      } else {
        if (
          this.state.playerList.filter(p => p.email_id === data.emailId)
            .length > 0
        ) {
          emailIdErrMsg =
            data.emailId + " is already taken. Please try a different emailId";
        }
      }
    }

    // phone validation
    if (this.hasValue(data.phone)) {
      data.phone = data.phone.toString().trim();
      if (!this.isValidPhone(data.phone)) {
        phoneErrMsg = "only digits allowed e.g. 9999999999";
      }
    }

    // check additional details when new user is added
    if (checkExtra) {
      // password validation
      if (this.hasValue(data.password)) {
        data.password = data.password.trim();
        if (!this.isValidPassword(data.password)) {
          passwordErrMsg = "please enter a valid password";
        }
      } else {
        passwordErrMsg = "password cannot be blank";
      }

      // confirm password validation
      if (this.hasValue(data.confirmPassword)) {
        data.confirmPassword = data.confirmPassword.trim();
        if (data.password !== data.confirmPassword) {
          confirmPasswordErrMsg = "password should match";
        }
      } else {
        confirmPasswordErrMsg = "confirm password field cannot be blank";
      }

      // secret question validation
      if (!this.hasValue(data.secretQid) || data.secretQid === "--Select--") {
        secretQErrMsg = "please select a question";
      }

      // secret answer validation
      if (this.hasValue(data.secretA)) {
        data.secretA = data.secretA.trim();
        if (!this.isValidAnswer(data.secretA)) {
          secretAErrMsg =
            "Only alphabates and space are allowed. No numbers, special characters allowed";
        }
      } else {
        secretAErrMsg = "Please enter a answer";
      }
    }

    if (
      firstNameErrMsg ||
      middleNameErrMsg ||
      lastNameErrMsg ||
      emailIdErrMsg ||
      phoneErrMsg ||
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
        phoneErrMsg,
        passwordErrMsg,
        confirmPasswordErrMsg,
        secretQErrMsg,
        secretAErrMsg
      });
      return false;
    }
    return true;
  };

  setEditModalData(
    id,
    firstName,
    lastName,
    middleName,
    emailId,
    teamName,
    phone,
    roleId
  ) {
    this.setState({
      modalData: {
        id,
        firstName,
        lastName,
        middleName,
        emailId,
        teamName,
        phone,
        roleId
      },
      modalDataOriginal: {
        id,
        firstName,
        lastName,
        middleName,
        emailId,
        teamName,
        phone,
        roleId
      }
    });
    this.toggleEditModal();
  }

  setDeleteModalData(
    id,
    firstName,
    lastName,
    middleName,
    emailId,
    teamName,
    phone
  ) {
    this.setState({
      modalData: {
        id,
        firstName,
        lastName,
        middleName,
        emailId,
        teamName,
        phone
      }
    });
    this.toggleDeleteModal();
  }

  hasValue(data) {
    return data !== undefined && data !== null && data !== "";
  }
  update() {
    let checkExtra = false; // if validation is called for update, do not check fields like password, secret q etc.
    let isValid = this.validate(this.state.modalData, checkExtra);
    if (isValid) {
      let { modalData } = this.state;
      let { editDetails } = this.state;

      editDetails.id = modalData.id;
      editDetails.firstName = modalData.firstName;
      editDetails.lastName = modalData.lastName;
      editDetails.middleName = modalData.middleName;
      editDetails.emailId = modalData.emailId;
      modalData.phone === ""
        ? (editDetails.phone = null)
        : (editDetails.phone = modalData.phone);
      editDetails.fullName = modalData.firstName;
      if (this.hasValue(modalData.middleName)) {
        editDetails.fullName += " " + modalData.middleName;
      }
      if (this.hasValue(modalData.lastName)) {
        editDetails.fullName += " " + modalData.lastName;
      }

      //   if (this.hasValue(modalData.managerUserId)) {
      //     editDetails.managerUserId = this.state.playerList.filter(
      //       player => player.full_name === modalData.managerUserId
      //     )[0].id;
      //   }
      //   this.hasValue(modalData.managerUserId)
      //     ? (editDetails.managerUserId = this.state.playerList.filter(
      //         player => player.full_name === modalData.managerUserId
      //       )[0].id)
      //   : (editDetails.managerUserId = null);

      this.hasValue(modalData.teamName)
        ? (editDetails.teamId = this.state.teamList.filter(
            t => t.team_name === modalData.teamName
          )[0].id)
        : (editDetails.teamId = null);

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
      editDetails.modified = date;
      editDetails.roleId = modalData.roleId;

      this.setState({ editDetails });
      console.log(this.state.modalData);
      console.log(this.state.editDetails);
      // const config = { headers: { "Content-Type": "application/json" } };
      axios
        .put(
          // "http://localhost:4000/put/updateteam",
          process.env.REACT_APP_UPDATE_PLAYER,
          this.state.editDetails
        )
        .then(res => {
          //   console.log(
          //     res.config,
          //     res.data,
          //     res.headers,
          //     res.request,
          //     res.status,
          //     res.statusText
          //   );
          this.setState({
            // msg: this.state.updateMsg + res.data
            msg:
              res.status === 200
                ? this.state.updateMsg
                : "status code " + res.status + "\n" + this.state.errMsg
          });
          axios.get(process.env.REACT_APP_PLAYER_LIST).then(res => {
            this.setState({
              playerList: res.data
            });
          });
          // this.props.fetchmessage(this.state.addMsg);
          // this.setState(prevState => ({
          //   editModalDisplay: !prevState.editModalDisplay
          // }));
          this.toggleEditModal();
          // page is refreshed / page refresh
          // window.location.reload();
        })
        .catch(error => {
          // console.log(error.request);
          this.setState({
            msg:
              this.state.errMsg +
              error.request.status +
              ". " +
              error.request.responseText
          });
          // this.setState(prevState => ({
          //   editModalDisplay: !prevState.editModalDisplay
          // }));
          this.toggleEditModal();
          // this.props.fetchmessage(this.state.errMsg);
        });
    }
  }

  delete() {
    axios
      .delete(
        // "http://localhost:4000/post/addnewteam",
        process.env.REACT_APP_DELETE_PLAYER,
        { data: this.state.modalData.id },
        {
          headers: {
            "Content-Type": "text/plain"
          }
        }
      )
      .then(res => {
        this.setState({
          // msg: this.state.addMsg + res.data
          msg:
            res.status === 200
              ? this.state.delMsg
              : "status code " + res.status + "\n" + this.state.errMsg
        });
        axios.get(process.env.REACT_APP_PLAYER_LIST).then(res => {
          this.setState({
            playerList: res.data
          });
        });
        // this.props.fetchmessage(this.state.addMsg);
        // this.setState(prevState => ({
        //   addteamModal: !prevState.addteamModal
        // }));
        this.toggleDeleteModal();
        // page is refreshed / page refresh
        // window.location.reload();
      })
      .catch(error => {
        this.setState({
          msg: this.state.errMsg + error
        });
        // this.setState(prevState => ({
        //   addteamModal: !prevState.addteamModal
        // }));
        this.toggleDeleteModal();
        // this.props.fetchmessage(this.state.errMsg);
      });
  }

  add() {
    let checkExtra = true; // validate additional details like password, secret q, secret ans etc.
    let isValid = this.validate(this.state.addDetails, checkExtra);
    if (isValid) {
      let { addDetails } = this.state;
      if (addDetails.teamId === 0) {
        addDetails.teamId = null;
      }
      addDetails.fullName = addDetails.firstName;
      if (this.hasValue(addDetails.middleName)) {
        addDetails.fullName += " " + addDetails.middleName;
      }
      if (this.hasValue(addDetails.lastName)) {
        addDetails.fullName += " " + addDetails.lastName;
      }
      addDetails.emailId = addDetails.emailId.toLowerCase();
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
      addDetails.roleId = 4;
      this.setState({ addDetails });
      axios
        .post(
          // "http://localhost:4000/post/addnewteam",
          process.env.REACT_APP_ADD_NEW_PLAYER,
          this.state.addDetails
        )
        .then(res => {
          this.setState({
            // msg: this.state.addMsg + res.data
            msg:
              res.status === 200
                ? this.state.addMsg
                : "status code " + res.status + "\n" + this.state.errMsg
          });
          axios.get(process.env.REACT_APP_PLAYER_LIST).then(res => {
            this.setState({
              playerList: res.data
            });
          });
          // this.props.fetchmessage(this.state.addMsg);
          // this.setState(prevState => ({
          //   addModalDisplay: !prevState.addModalDisplay
          // }));
          this.toggleAddModal();
          // page is refreshed / page refresh
          // window.location.reload();
        })
        .catch(error => {
          this.setState({
            msg: this.state.errMsg + error
          });
          // this.setState(prevState => ({
          //   addModalDisplay: !prevState.addModalDisplay
          // }));
          this.toggleAddModal();
          // this.props.fetchmessage(this.state.errMsg);
        });
    }
  }
  filterData() {
    axios
      .get(
        // "http://localhost:4000/post/addnewmatch",
        process.env.REACT_APP_GET_PLAYER,
        {
          params: {
            full_name: this.state.filterDetails.fullName,
            email_id: this.state.filterDetails.emailId,
            team_id: this.state.filterDetails.teamId,
            role_id: this.state.filterDetails.roleId
          }
        }
      )
      .then(res => {
        this.setState({
          playerList: res.data
        });
        // this.props.fetchmessage(this.state.addMsg);
        // this.setState(prevState => ({
        //   addModalDisplay: !prevState.addModalDisplay
        // }));
        this.toggleFilterMatchModal();
        // page is refreshed / page refresh
        // window.location.reload();
      })
      .catch(error => {
        this.setState({
          msg: this.state.errMsg + error
        });
        // this.setState(prevState => ({
        //   addModalDisplay: !prevState.addModalDisplay
        // }));
        this.toggleFilterMatchModal();
        // this.props.fetchmessage(this.state.errMsg);
      });
  }

  alrt = () => {
    if (this.state.msg !== "") {
      let m = <Alert color="info">{this.state.msg}</Alert>;
      return m;
    } else {
      return null;
    }
  };

  td(details, teams, columns) {
    return columns.map((item, i) => {
      let href = "";
      let tdLinkCls = "";
      let id = "";
      if (item === "full_name") {
        // check if playerList has been loaded from db on completion of componentDidMount()
        // check if captain or manager value exists for the team in <td>
        // if (players.length > 0) {
        //   id = players
        //     .filter(p => p.full_name === details[item])[0]
        //     .id.toString();
        // }
        // href = process.env.REACT_APP_GET_PLAYER + details.id.toString();
        // href = "/player/" + this.state.userId + "/" + details.email_id;
        href = "/player/" + details.email_id;
        tdLinkCls = "tdLink";
      }
      if (item === "team_name") {
        // check if playerList has been loaded from db on completion of componentDidMount()
        // check if captain or manager value exists for the team in <td>
        if (teams.length > 0 && details[item]) {
          id = teams
            .filter(t => t.team_name === details[item])[0]
            .id.toString();
        }
        href = process.env.REACT_APP_GET_TEAM + id;
        tdLinkCls = "tdLink";
      }

      return (
        <td key={i}>
          {/* <a className={tdLinkCls} href={href}> */}
          <NavLink
            className={tdLinkCls}
            to={{
              // pathname: "/player/" + details.email_id,
              pathname: href,
              state: {
                userEmail: this.state.userEmail
              }
            }}
          >
            {details[item]}
          </NavLink>
        </td>
      );
    });
  }
  formatRows(data, teams, columns) {
    return data.map(details => {
      return (
        <tr key={details.id} className="trTbl">
          {this.td(details, teams, columns)}
          {this.state.showEdit ? (
            <td>
              <Button
                color="info"
                className="mr-1"
                size="sm"
                // onClick={this.toggleEditModal.bind(this)}
                onClick={this.setEditModalData.bind(
                  this,
                  details.id,
                  details.first_name,
                  details.last_name,
                  details.middle_name,
                  details.email_id,
                  details.team_name,
                  details.contact_no,
                  details.role_id
                )}
              >
                Edit
              </Button>
            </td>
          ) : null}
          {this.state.showDelete ? (
            <td>
              <Button
                color="danger"
                size="sm"
                // onClick={this.toggleDeleteModal.bind(this)}
                onClick={this.setDeleteModalData.bind(
                  this,
                  details.id,
                  details.first_name,
                  details.last_name,
                  details.middle_name,
                  details.email_id,
                  details.team_name,
                  details.contact_no
                )}
              >
                Delete
              </Button>
            </td>
          ) : null}
        </tr>
      );
    });
  }

  addModal() {
    return (
      <Modal
        isOpen={this.state.addModalDisplay}
        toggle={this.toggleAddModal.bind(this)}
      >
        <ModalHeader toggle={this.toggleAddModal.bind(this)}>
          Add Player Details
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="firstNameId">
                First Name
              </Label>
              {/* <p className="hintPara">(Hint: your team )</p> */}
              {/* </div> */}
              <Input
                type="text"
                name="firstName"
                id="firstNameId"
                // defaultValue={this.state.addDetails.firstName}
                //   value={this.state.addDetails.firstName}
                placeholder="First Name"
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.firstName = e.target.value;
                  this.setState({ addDetails });
                }}
              ></Input>
              <p className="validationMsg">{this.state.firstNameErrMsg}</p>
            </FormGroup>
            <FormGroup>
              {/* <div className="inLine"> */}
              <Label for="middleNameId">Middle Name</Label>
              {/* <p className="hintPara">(Hint: your middleName )</p> */}
              {/* </div> */}
              <Input
                type="text"
                name="middleName"
                id="middleNameId"
                // defaultValue={this.state.addDetails.middleName}
                //   value={this.state.addDetails.middleName}
                placeholder="Middle Name"
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.middleName = e.target.value;
                  this.setState({ addDetails });
                }}
              ></Input>
              <p className="validationMsg">{this.state.middleNameErrMsg}</p>
            </FormGroup>
            <FormGroup>
              {/* <div className="inLine"> */}
              <Label for="lastNameId">Last Name</Label>
              {/* <p className="hintPara">(Hint: your lastName )</p> */}
              {/* </div> */}
              <Input
                type="text"
                name="lastName"
                id="lastNameId"
                // defaultValue={this.state.addDetails.teamName}
                //   value={this.state.addDetails.lastName}
                placeholder="Last Name"
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.lastName = e.target.value;
                  this.setState({ addDetails });
                }}
              ></Input>
              <p className="validationMsg">{this.state.lastNameErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="emailId">
                Email ID
              </Label>
              {/* <p className="hintPara">(Hint: your lastName )</p> */}
              {/* </div> */}
              <Input
                type="text"
                name="email"
                id="emailId"
                // defaultValue={this.state.addDetails.teamName}
                // value={this.state.addDetails.emailId}
                placeholder="Email ID"
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.emailId = e.target.value;
                  this.setState({ addDetails });
                }}
              ></Input>
              <p className="validationMsg">{this.state.emailIdErrMsg}</p>
            </FormGroup>
            <FormGroup>
              {/* <div className="inLine"> */}
              <Label for="selectTeamNameId">Team</Label>
              {/* <p className="hintPara">
                        (Hint: if opponent not decided, select own team)
                      </p> */}
              {/* </div> */}
              <Input
                type="select"
                name="selectTeam"
                id="selectTeamNameId"
                // defaultValue={this.state.addDetails.captainUserId}
                // value={this.state.addDetails.captainUserId}
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.teamId = e.target.value;
                  this.setState({ addDetails });
                }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {this.state.teamList.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.team_name}
                  </option>
                ))}
              </Input>
              {/* <p className="validationMsg">{this.state.teamNameErrMsg}</p> */}
            </FormGroup>
            <FormGroup>
              {/* <div className="inLine"> */}
              <Label for="phoneId">Phone</Label>
              <p className="hintPara">(Hint: e.g. 9999999999)</p>
              {/* </div> */}
              <Input
                type="text"
                name="phoneName"
                id="phoneId"
                // defaultValue={this.state.addDetails.managerUserId}
                //   value={this.state.addDetails.phone}
                placeholder="Phone Number"
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.phone = e.target.value;
                  this.setState({ addDetails });
                }}
              ></Input>
              <p className="validationMsg">{this.state.phoneErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="passwordId">
                Password
              </Label>
              <p className="hintPara">
                (Hint: at least one uppercase/number/special
                character(!@#$&*)/lowercase required)
              </p>
              {/* </div> */}
              <Input
                type="password"
                name="passwordName"
                id="passwordId"
                // defaultValue={this.state.addDetails.managerUserId}
                //   value={this.state.addDetails.phone}
                placeholder="Password"
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.password = e.target.value;
                  this.setState({ addDetails });
                }}
              ></Input>
              <p className="validationMsg">{this.state.passwordErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="confirmPasswordId">
                Confirm Password
              </Label>
              {/* <p className="hintPara">
                (Hint: at least one uppercase/number/special
                character(!@#$&*)/lowercase required)
              </p> */}
              {/* </div> */}
              <Input
                type="password"
                name="confirmPasswordName"
                id="confirmPasswordId"
                // defaultValue={this.state.addDetails.managerUserId}
                //   value={this.state.addDetails.phone}
                placeholder="Password"
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.confirmPassword = e.target.value;
                  this.setState({ addDetails });
                }}
              ></Input>
              <p className="validationMsg">
                {this.state.confirmPasswordErrMsg}
              </p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="secretQId">
                Secret Question
              </Label>
              {/* <p className="hintPara">(Hint: your lastName )</p> */}
              {/* </div> */}
              <Input
                type="select"
                name="selectsecretQ"
                id="secretQId"
                // defaultValue={this.state.addDetails.captainUserId}
                // value={this.state.addDetails.captainUserId}
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.secretQid = e.target.value;
                  this.setState({ addDetails });
                }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {this.state.secretQList.map(q => (
                  <option key={q.id} value={q.id}>
                    {q.question}
                  </option>
                ))}
                >
              </Input>
              <p className="validationMsg">{this.state.secretQErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="secretAId">
                Secret Answer
              </Label>
              <p className="hintPara">
                (Hint: only alphabets and space allowed. no numbers or special
                characters allowed)
              </p>
              {/* </div> */}
              <Input
                type="text"
                name="secretAName"
                id="secretAId"
                // defaultValue={this.state.addDetails.managerUserId}
                //   value={this.state.addDetails.phone}
                placeholder="Secret Answer"
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.secretA = e.target.value;
                  this.setState({ addDetails });
                }}
              ></Input>
              <p className="validationMsg">{this.state.secretAErrMsg}</p>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.add.bind(this)}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={this.toggleAddModal.bind(this)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
  filterModal() {
    return (
      <Modal
        isOpen={this.state.filterModalDisplay}
        toggle={this.toggleFilterMatchModal.bind(this)}
      >
        <ModalHeader toggle={this.toggleFilterMatchModal.bind(this)}>
          Filter
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="fullNameId">Full Name</Label>
              <Input
                type="select"
                name="select"
                id="fullNameId"
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.fullName = e.target.value;
                  this.setState({ filterDetails });
                }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {this.state.filterPlayerList.map(player => (
                  <option key={player.id} value={player.full_name}>
                    {player.full_name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="emailId">Email ID</Label>
              <Input
                type="select"
                name="select"
                id="emailId"
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.emailId = e.target.value;
                  this.setState({ filterDetails });
                }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {this.state.filterPlayerList.map(player => (
                  <option key={player.id} value={player.email_id}>
                    {player.email_id}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="selectTeamId">Team</Label>
              <Input
                type="select"
                name="select"
                id="selectTeamId"
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.teamId = e.target.value;
                  this.setState({ filterDetails });
                }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {this.state.teamList.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.team_name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="selectRoleId">Role</Label>
              <Input
                type="select"
                name="select"
                id="selectRoleId"
                // value={this.state.addDetails.venue}
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.roleId = e.target.value;
                  this.setState({ filterDetails });
                }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {this.state.userRoleList.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.role}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.filterData.bind(this)}>
            Filter
          </Button>{" "}
          <Button
            color="secondary"
            onClick={this.toggleFilterMatchModal.bind(this)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  editModal() {
    return (
      <Modal
        isOpen={this.state.editModalDisplay}
        toggle={this.toggleEditModal.bind(this)}
      >
        <ModalHeader toggle={this.toggleEditModal.bind(this)}>
          Edit Player Details
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="formRequired">
              <div className="inLine">
                <Label className="labelRequired" for="firstNameId">
                  First Name
                </Label>
                {/* <p className="hintPara">(Hint: your team )</p> */}
              </div>
              <Input
                type="text"
                name="firstName"
                id="firstNameId"
                // defaultValue={this.state.modalData.firstName}
                value={this.state.modalData.firstName}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.firstName = e.target.value;
                  this.setState({ modalData });
                }}
              ></Input>
              <p className="validationMsg">{this.state.firstNameErrMsg}</p>
            </FormGroup>
            <FormGroup>
              <div className="inLine">
                <Label for="middleNameId">Middle Name</Label>
                {/* <p className="hintPara">(Hint: your middleName )</p> */}
              </div>
              <Input
                type="text"
                name="middleName"
                id="middleNameId"
                // defaultValue={this.state.modalData.middleName}
                value={this.state.modalData.middleName}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.middleName = e.target.value;
                  this.setState({ modalData });
                }}
              ></Input>
              <p className="validationMsg">{this.state.middleNameErrMsg}</p>
            </FormGroup>
            <FormGroup>
              <div className="inLine">
                <Label for="lastNameId">Last Name</Label>
                {/* <p className="hintPara">(Hint: your lastName )</p> */}
              </div>
              <Input
                type="text"
                name="lastName"
                id="lastNameId"
                // defaultValue={this.state.modalData.teamName}
                value={this.state.modalData.lastName}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.lastName = e.target.value;
                  this.setState({ modalData });
                }}
              ></Input>
              <p className="validationMsg">{this.state.lastNameErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              <div className="inLine">
                <Label className="labelRequired" for="emailId">
                  Email ID
                </Label>
                {/* <p className="hintPara">(Hint: your lastName )</p> */}
              </div>
              <Input
                type="text"
                name="email"
                id="emailId"
                // defaultValue={this.state.modalData.teamName}
                value={this.state.modalData.emailId}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.emailId = e.target.value;
                  this.setState({ modalData });
                }}
              ></Input>
              <p className="validationMsg">{this.state.emailIdErrMsg}</p>
            </FormGroup>
            <FormGroup>
              <div className="inLine">
                <Label for="selectTeamNameId">Team</Label>
                {/* <p className="hintPara">
                        (Hint: if opponent not decided, select own team)
                      </p> */}
              </div>
              <Input
                type="select"
                name="selectTeam"
                id="selectTeamNameId"
                // defaultValue={this.state.modalData.captainUserId}
                value={this.state.modalData.teamName}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.teamName = e.target.value;
                  this.setState({ modalData });
                }}
              >
                <option key={this.state.modalData.id}>
                  {this.state.modalData.teamName}
                </option>
                {/* <option disabled className="optionCls">
                        ────────────────────────────────────────────
                      </option> */}
                <option disabled className="optionCls"></option>
                {/* <hr /> */}
                {this.state.teamList.map(t => (
                  <option key={t.id} value={t.team_name}>
                    {t.team_name}
                  </option>
                ))}
              </Input>
              {/* <p className="validationMsg">{this.state.teamNameErrMsg}</p> */}
            </FormGroup>
            <FormGroup>
              <div className="inLine">
                <Label for="phoneId">Phone</Label>
                <p className="hintPara">
                  (Hint: e.g. +19999999999 / +919999999999 / 9999999999)
                </p>
              </div>
              <Input
                type="text"
                name="phoneName"
                id="phoneId"
                // defaultValue={this.state.modalData.managerUserId}
                value={this.state.modalData.phone}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.phone = e.target.value;
                  this.setState({ modalData });
                }}
              ></Input>
              <p className="validationMsg">{this.state.phoneErrMsg}</p>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            // onClick={this.toggleEditModal.bind(this)}
            onClick={this.update.bind(this)}
          >
            Save
          </Button>{" "}
          <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  deleteModal() {
    return (
      <Modal
        isOpen={this.state.deleteModalDisplay}
        toggle={this.toggleDeleteModal.bind(this)}
      >
        <ModalHeader toggle={this.toggleDeleteModal.bind(this)}>
          Delete
        </ModalHeader>
        <ModalBody>
          <h6 className="colorRed">
            Do you want to delete this team? It cannot be recovered after
            deletion
          </h6>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Id: </span>
            <span className="modalParaDataSpan">{this.state.modalData.id}</span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">First Name: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.firstName}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Middle Name: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.middleName}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Last Name: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.lastName}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Email ID: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.emailId}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Team: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.teamName}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Phone: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.phone}
            </span>
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="warning"
            // onClick={this.toggleDeleteModal.bind(this)}
            onClick={this.delete.bind(this)}
          >
            Confirm Delete
          </Button>{" "}
          <Button color="secondary" onClick={this.toggleDeleteModal.bind(this)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  addBtn() {
    if (this.state.showAdd) {
      return (
        <div>
          <Button
            color="primary"
            className="mb-2"
            //   size="sm"
            onClick={this.toggleAddModal.bind(this)}
          >
            Add New Player
          </Button>
        </div>
      );
    }
  }
  filterBtn() {
    return (
      <div>
        <Button
          color="info"
          className="mb-2 mr-2"
          //   size="sm"
          onClick={this.toggleFilterMatchModal.bind(this)}
        >
          Filter
        </Button>
      </div>
    );
  }

  componentDidMount() {
    // axios.get("http://localhost:4000/getteamlist").then(res => {
    axios.get(process.env.REACT_APP_TEAM_LIST).then(res => {
      this.setState({
        teamList: res.data
      });
      // this.state.teamList.splice(0, 0, "--Select--");
    });

    // axios.get("http://localhost:4000/getplayerlist").then(res => {
    axios.get(process.env.REACT_APP_PLAYER_LIST).then(res => {
      this.setState({
        playerList: res.data,
        filterPlayerList: res.data
      });
    });

    axios.get(process.env.REACT_APP_USER_ROLE_LIST).then(res => {
      this.setState({
        userRoleList: res.data
      });
    });

    axios.get(process.env.REACT_APP_SECRET_QUESTION_LIST).then(res => {
      this.setState({
        secretQList: res.data
      });
    });
  }

  render() {
    this.tbl = new tblHeaderClass();
    return (
      <div id="pageTop">
        <NavbarDispClass
        // homeActive={false}
        // teamActive={false}
        // requestActive={false}
        // userId={this.state.userId}
        />
        <div className="container">
          {this.addModal()}
          {this.editModal()}
          {this.deleteModal()}
          {this.filterModal()}
          <h1 className="pageHead">{this.props.header}</h1>
          <this.alrt />
          <div className="add-filter-btn">
            {this.filterBtn()}
            {this.addBtn()}
          </div>
          <Table bordered size="sm">
            <thead>
              <tr>
                {
                  /* <th>id</th>
              <th>Date</th>
              <th>Time</th>
              <th>Home_Team</th>
              <th>Away_Team</th>
              <th>Venue_Id</th>
              <th>Umpire_Id</th> */
                  // if user has permissions to see the action column, then showdisplay the column 'Action'
                  (this.state.showEdit &&
                  this.state.colHead.slice(-1)[0] !== "Edit" &&
                  this.state.colHead.slice(-1)[0] !== "Delete"
                    ? this.state.colHead.push("Edit")
                    : null,
                  this.state.showDelete &&
                  this.state.colHead.slice(-1)[0] !== "Delete"
                    ? this.state.colHead.push("Delete")
                    : null,
                  this.tbl.createHeader(this.state.colHead))
                }
              </tr>
            </thead>
            <tbody>
              {this.formatRows(
                this.state.playerList,
                this.state.teamList,
                this.state.columns
              )}
            </tbody>
          </Table>
        </div>
        <a href="#pageTop">
          <div className="topBtn">Top</div>
        </a>
        <NavbarFooterClass />
      </div>
    );
  }
}

export default PlayerTblClass;
