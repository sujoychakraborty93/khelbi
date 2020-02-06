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

class TeamTblClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colHead: [
        // "Id",
        "Team Name",
        "Captain",
        "Captain Contact",
        "Manager",
        "Manager Contact",
        "Action"
      ],
      columns: [
        "team_name",
        "captain_name",
        "captain_contact_no",
        "manager_name",
        "manager_contact_no"
      ],
      editModal: false,
      deleteModal: false,
      addModal: false,
      addDetails: {
        teamName: "",
        captainUserId: null,
        managerUserId: null
      },

      editDetails: {
        id: null,
        teamName: "",
        captainUserId: null,
        managerUserId: null
      },
      modalData: {
        id: null,
        teamName: "",
        captainUserId: "",
        managerUserId: ""
      },
      modalDataOriginal: {
        id: null,
        teamName: "",
        captainUserId: "",
        managerUserId: ""
      },
      teamNameErrMsg: "",
      captainErrMsg: "",
      managerErrMsg: "",
      playersErrMsg: "",
      teamList: [],
      playerList: [],
      msg: "",
      addMsg: "New team added successfully!",
      errMsg: `Sorry we encountered an error. Please report below details to the admin using 
      Contact Us link at bottom of the page. `,
      updateMsg: "Team details updated successfully",
      delMsg: "team deleted!"
    };
  }

  toggleEditModal() {
    this.setState(prevState => ({
      editModal: !prevState.editModal
    }));
    this.resetStates();
  }
  toggleDeleteModal() {
    this.setState(prevState => ({
      deleteModal: !prevState.deleteModal
    }));
    this.resetStates();
  }
  toggleAddModal() {
    this.setState(prevState => ({
      addModal: !prevState.addModal
    }));
    this.resetStates();
  }

  resetStates = () => {
    this.setState({
      teamNameErrMsg: "",
      captainErrMsg: "",
      managerErrMsg: "",
      addDetails: {
        teamName: "",
        captainUserId: null,
        managerUserId: null
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
  isValidString(str) {
    // return !/[~`!#$%\^&*+=\-\[\]\\';,/{@}|\\":<>\?]/g.test(str);
    return !/[~`!$%^*+=[\]\\';,/{}()|\\"<>?]/g.test(str) && str.match(/[a-z]/i);
  }

  validate = data => {
    let teamNameErrMsg = "";
    let captainErrMsg = "";
    // let managerErrMsg = "";

    data.teamName = data.teamName.trim();

    if (
      this.state.modalDataOriginal.teamName !== data.teamName ||
      this.state.modalDataOriginal.teamName === ""
    ) {
      if (
        !data.teamName ||
        data.teamName.length <= 2 ||
        !isNaN(data.teamName) ||
        !this.isValidString(data.teamName)
      ) {
        teamNameErrMsg =
          "At least 3 characters with one alphabet. Allowed special characters #&-@:_";
      } else {
        if (
          this.state.teamList.filter(d => d.team_name === data.teamName)
            .length > 0
        ) {
          teamNameErrMsg =
            data.teamName + " is already taken. Please try a different name";
        }
      }
    }

    if (!data.captainUserId || data.captainUserId === "--Select--") {
      captainErrMsg = `please select a captain`;
    }

    // if (!data.managerUserId || data.managerUserId === "--Select--") {
    //   managerErrMsg = `please select a manager`;
    // }

    // if (teamNameErrMsg || captainErrMsg || managerErrMsg) {
    if (teamNameErrMsg || captainErrMsg) {
      this.setState({
        teamNameErrMsg,
        captainErrMsg
        // managerErrMsg
      });
      return false;
    }
    return true;
  };

  setEditModalData(id, teamName, captainUserId, managerUserId) {
    this.setState({
      modalData: { id, teamName, captainUserId, managerUserId },
      modalDataOriginal: { id, teamName, captainUserId, managerUserId }
      // editDetails: { id, teamName, captainUserId, managerUserId }
    });
    this.toggleEditModal();
  }

  setDeleteModalData(id, teamName, captainUserId, managerUserId) {
    this.setState({
      modalData: { id, teamName, captainUserId, managerUserId }
      // editDetails: { id, teamName, captainUserId, managerUserId }
    });
    this.toggleDeleteModal();
  }

  hasValue(data) {
    return data !== undefined && data !== null && data !== "";
  }
  update() {
    let isValid = this.validate(this.state.modalData);
    if (isValid) {
      let { modalData } = this.state;
      let { editDetails } = this.state;

      editDetails.id = modalData.id;
      editDetails.teamName = modalData.teamName;

      if (this.hasValue(modalData.captainUserId)) {
        editDetails.captainUserId = this.state.playerList.filter(
          player => player.full_name === modalData.captainUserId
        )[0].id;
      }

      // if (this.hasValue(modalData.managerUserId)) {
      //   editDetails.managerUserId = this.state.playerList.filter(
      //     player => player.full_name === modalData.managerUserId
      //   )[0].id;
      // }
      this.hasValue(modalData.managerUserId)
        ? (editDetails.managerUserId = this.state.playerList.filter(
            player => player.full_name === modalData.managerUserId
          )[0].id)
        : (editDetails.managerUserId = null);

      this.setState({ editDetails });
      // console.log(this.state.modalData);
      // console.log(this.state.editDetails);
      // const config = { headers: { "Content-Type": "application/json" } };
      axios
        .put(
          // "http://localhost:4000/put/updateteam",
          process.env.REACT_APP_UPDATE_TEAM,
          this.state.editDetails
        )
        .then(res => {
          this.setState({
            // msg: this.state.updateMsg + res.data
            msg:
              res.status === 200
                ? this.state.updateMsg
                : "status code " + res.status + "\n" + this.state.errMsg
          });
          axios.get(process.env.REACT_APP_TEAM_LIST).then(res => {
            this.setState({
              teamList: res.data
            });
          });
          // this.props.fetchmessage(this.state.addMsg);
          // this.setState(prevState => ({
          //   editModal: !prevState.editModal
          // }));
          this.toggleEditModal();
          // page is refreshed / page refresh
          // window.location.reload();
        })
        .catch(error => {
          this.setState({
            msg: this.state.errMsg + error
          });
          // this.setState(prevState => ({
          //   editModal: !prevState.editModal
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
        process.env.REACT_APP_DELETE_TEAM,
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
        axios.get(process.env.REACT_APP_TEAM_LIST).then(res => {
          this.setState({
            teamList: res.data
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
    let isValid = this.validate(this.state.addDetails);
    if (isValid) {
      // console.log(this.state.addDetails);
      axios
        .post(
          // "http://localhost:4000/post/addnewteam",
          process.env.REACT_APP_ADD_NEW_TEAM,
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
          axios.get(process.env.REACT_APP_TEAM_LIST).then(res => {
            this.setState({
              teamList: res.data
            });
          });
          // this.props.fetchmessage(this.state.addMsg);
          // this.setState(prevState => ({
          //   addModal: !prevState.addModal
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
          //   addModal: !prevState.addModal
          // }));
          this.toggleAddModal();
          // this.props.fetchmessage(this.state.errMsg);
        });
    }
  }

  alrt = () => {
    if (this.state.msg !== "") {
      let m = <Alert color="info">{this.state.msg}</Alert>;
      return m;
    } else {
      return null;
    }
  };

  td(details, column) {
    return column.map((item, i) => {
      return <td key={i}>{details[item]}</td>;
    });
  }
  formatRows(data, columns) {
    return data.map(details => {
      return (
        <tr key={details.id} className="trTbl">
          {this.td(details, columns)}
          <td>
            <Button
              color="info"
              className="mr-1"
              size="sm"
              // onClick={this.toggleEditModal.bind(this)}
              onClick={this.setEditModalData.bind(
                this,
                details.id,
                details.team_name,
                details.captain_name,
                details.manager_name
              )}
            >
              Edit
            </Button>
            <Modal
              isOpen={this.state.editModal}
              toggle={this.toggleEditModal.bind(this)}
            >
              <ModalHeader toggle={this.toggleEditModal.bind(this)}>
                Edit Team Details
              </ModalHeader>
              <ModalBody>
                <Form>
                  <FormGroup className="formRequired">
                    <div className="inLine">
                      <Label className="labelRequired" for="teamNameId">
                        Team Name
                      </Label>
                      {/* <p className="hintPara">(Hint: your team )</p> */}
                    </div>
                    <Input
                      type="text"
                      name="editTeamName"
                      id="teamNameId"
                      // defaultValue={this.state.modalData.teamName}
                      value={this.state.modalData.teamName}
                      onChange={e => {
                        let { modalData } = this.state;
                        modalData.teamName = e.target.value;
                        this.setState({ modalData });
                        // console.log(e.target.value);
                      }}
                    ></Input>
                    <p className="validationMsg">{this.state.teamNameErrMsg}</p>
                  </FormGroup>
                  <FormGroup className="formRequired">
                    <div className="inLine">
                      <Label className="labelRequired" for="selectCaptainId">
                        Captain
                      </Label>
                      {/* <p className="hintPara">
                        (Hint: if opponent not decided, select own team)
                      </p> */}
                    </div>
                    <Input
                      type="select"
                      name="selectCaptain"
                      id="selectCaptainId"
                      // defaultValue={this.state.modalData.captainUserId}
                      // value={this.state.modalData.captainUserId}
                      onChange={e => {
                        let { modalData } = this.state;
                        modalData.captainUserId = e.target.value;
                        this.setState({ modalData });
                      }}
                    >
                      <option key={this.state.modalData.id}>
                        {this.state.modalData.captainUserId}
                      </option>
                      {/* <option disabled className="optionCls">
                        ────────────────────────────────────────────
                      </option> */}
                      <option disabled className="optionCls"></option>
                      {/* <hr /> */}
                      {this.state.playerList.map(player => (
                        <option key={player.id} value={player.full_name}>
                          {player.full_name}
                        </option>
                      ))}
                    </Input>
                    <p className="validationMsg">{this.state.captainErrMsg}</p>
                  </FormGroup>
                  <FormGroup>
                    <Label for="selectManagerId">Manger</Label>
                    <Input
                      type="select"
                      name="selectManager"
                      id="selectManagerId"
                      // defaultValue={this.state.modalData.managerUserId}
                      // value={this.state.modalData.managerUserId}
                      onChange={e => {
                        let { modalData } = this.state;
                        modalData.managerUserId = e.target.value;
                        this.setState({ modalData });
                      }}
                    >
                      <option key={this.state.modalData.id}>
                        {this.state.modalData.managerUserId}
                      </option>
                      <option disabled className="optionCls"></option>
                      {this.state.playerList.map(player => (
                        <option key={player.id} value={player.full_name}>
                          {player.full_name}
                        </option>
                      ))}
                    </Input>
                    <p className="validationMsg">{this.state.managerErrMsg}</p>
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
                <Button
                  color="secondary"
                  onClick={this.toggleEditModal.bind(this)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
            <Button
              color="danger"
              size="sm"
              // onClick={this.toggleDeleteModal.bind(this)}
              onClick={this.setDeleteModalData.bind(
                this,
                details.id,
                details.team_name,
                details.captain_name,
                details.manager_name
              )}
            >
              Delete
            </Button>
            <Modal
              isOpen={this.state.deleteModal}
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
                  <span className="modalParaDataSpan">
                    {this.state.modalData.id}
                  </span>
                </p>
                <p className="modalPara">
                  <span className="modalParaHeadSpan">Team Name: </span>
                  <span className="modalParaDataSpan">
                    {this.state.modalData.teamName}
                  </span>
                </p>
                <p className="modalPara">
                  <span className="modalParaHeadSpan">Captain: </span>
                  <span className="modalParaDataSpan">
                    {this.state.modalData.captainUserId}
                  </span>
                </p>
                <p className="modalPara">
                  <span className="modalParaHeadSpan">Manager: </span>
                  <span className="modalParaDataSpan">
                    {this.state.modalData.managerUserId}
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
                <Button
                  color="secondary"
                  onClick={this.toggleDeleteModal.bind(this)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </td>
        </tr>
      );
    });
  }

  addBtn() {
    return (
      <div>
        <Button
          color="primary"
          className="mb-2"
          //   size="sm"
          onClick={this.toggleAddModal.bind(this)}
        >
          Add New Team
        </Button>
        <Modal
          isOpen={this.state.addModal}
          toggle={this.toggleAddModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleAddModal.bind(this)}>
            Add Team Details
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup className="formRequired">
                <div className="inLine">
                  <Label className="labelRequired" for="teamNameId">
                    Team Name
                  </Label>
                  {/* <p className="hintPara">(Hint: your team )</p> */}
                </div>
                <Input
                  type="text"
                  name="teamName"
                  id="teamNameId"
                  // value={this.state.addDetails.teamName}
                  onChange={e => {
                    let { addDetails } = this.state;
                    addDetails.teamName = e.target.value;
                    this.setState({ addDetails });
                  }}
                  placeholder="your team name"
                ></Input>
                <p className="validationMsg">{this.state.teamNameErrMsg}</p>
              </FormGroup>
              <FormGroup className="formRequired">
                <div className="inLine">
                  <Label className="labelRequired" for="selectCaptainId">
                    Captain
                  </Label>
                  {/* <p className="hintPara"> (Hint: Captain team) </p> */}
                </div>
                <Input
                  type="select"
                  name="select"
                  id="selectCaptainId"
                  // value={this.state.addDetails.aTeam}
                  onChange={e => {
                    let { addDetails } = this.state;
                    addDetails.captainUserId = e.target.value;
                    this.setState({ addDetails });
                  }}
                >
                  <option key="0">--Select--</option>
                  {this.state.playerList.map(player => (
                    <option key={player.id} value={player.id}>
                      {player.full_name}
                    </option>
                  ))}
                </Input>
                <p className="validationMsg">{this.state.captainErrMsg}</p>
              </FormGroup>
              <FormGroup>
                <Label for="selectManagerId">Manager</Label>
                <Input
                  type="select"
                  name="select"
                  id="selectManagerId"
                  // value={this.state.addDetails.venue}
                  onChange={e => {
                    let { addDetails } = this.state;
                    addDetails.managerUserId = e.target.value;
                    this.setState({ addDetails });
                  }}
                >
                  <option key="0">--Select--</option>
                  {this.state.playerList.map(player => (
                    <option key={player.id} value={player.id}>
                      {player.full_name}
                    </option>
                  ))}
                </Input>
                <p className="validationMsg">{this.state.managerErrMsg}</p>
              </FormGroup>
              {/* <FormGroup>
                <Label for="selectPlayersId">Select Players</Label>
                <CustomInput
                  type="select"
                  id="selectPlayersId"
                  name="customSelect"
                  multiple
                  //   value={this.state.addDetails.aTeam}
                  // onChange={e => {
                  //   let { addDetails } = this.state;
                  //   addDetails.aTeam = e.target.value;
                  //   this.setState({ addDetails });
                  // }}
                >
                  {this.state.playerList.map(player => (
                    <option key={player.id} value={player.id}>
                      {player.full_name}
                    </option>
                  ))}
                </CustomInput>
                <p className="validationMsg">{this.state.playersErrMsg}</p>
              </FormGroup> */}
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
        playerList: res.data
      });
    });
  }

  render() {
    this.tbl = new tblHeaderClass();
    return (
      <div>
        <NavbarDispClass
        // homeActive={false}
        // teamActive={false}
        // requestActive={false}
        />
        <div className="container">
          <h1 className="pageHead">{this.props.header}</h1>
          <this.alrt />
          {this.addBtn()}
          <Table bordered size="sm">
            <thead>
              <tr>
                {/* <th>id</th>
              <th>Date</th>
              <th>Time</th>
              <th>Home_Team</th>
              <th>Away_Team</th>
              <th>Venue_Id</th>
              <th>Umpire_Id</th> */
                this.tbl.createHeader(this.state.colHead)}
              </tr>
            </thead>
            <tbody>
              {this.formatRows(this.state.teamList, this.state.columns)}
            </tbody>
          </Table>
        </div>
        <NavbarFooterClass />
      </div>
    );
  }
}

export default TeamTblClass;
