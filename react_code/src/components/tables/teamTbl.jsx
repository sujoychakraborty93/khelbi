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
      userEmail: this.props.userEmail,
      colHead: [
        // "Id",
        "Team Name",
        "Captain",
        "Captain Contact",
        "Manager",
        "Manager Contact"
      ],
      columns: [
        "team_name",
        "captain_name",
        "captain_contact_no",
        "manager_name",
        "manager_contact_no"
      ],
      editModalDisplay: false,
      deleteModalDisplay: false,
      addModalDisplay: false,
      filterModalDisplay: false,
      addDetails: {
        teamName: "",
        captainUserId: null,
        managerUserId: null
      },
      filterDetails: {
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
      filterTeamList: [],
      playerList: [],
      captainList: [],
      managerList: [],
      msg: "",
      addMsg: "New team added successfully!",
      errMsg: `Sorry we encountered an error. Please report below details to the admin using 
      Contact Us link at bottom of the page. Error code: `,
      updateMsg: "Team details updated successfully",
      delMsg: "Team deleted!",
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
      teamNameErrMsg: "",
      captainErrMsg: "",
      managerErrMsg: "",
      addDetails: {
        teamName: "",
        captainUserId: null,
        managerUserId: null
      },

      filterDetails: {
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
      console.log(this.state.modalData);
      console.log(this.state.editDetails);
      // const config = { headers: { "Content-Type": "application/json" } };
      axios
        .put(
          // "http://localhost:4000/put/updateteam",
          process.env.REACT_APP_UPDATE_TEAM,
          this.state.editDetails
        )
        .then(res => {
          // console.log(
          //   res.config,
          //   res.data,
          //   res.headers,
          //   res.request,
          //   res.status,
          //   res.statusText
          // );
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
    console.log(this.state.filterDetails.teamName);
    axios
      .get(
        // "http://localhost:4000/post/addnewmatch",
        process.env.REACT_APP_GET_TEAM,
        {
          params: {
            id: this.state.filterDetails.teamName,
            captain_id: this.state.filterDetails.captainUserId,
            manager_id: this.state.filterDetails.managerUserId
          }
        }
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          teamList: res.data
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

  td(details, players, columns) {
    return columns.map((item, i) => {
      let href = "";
      let tdLinkCls = "";
      let id = "";
      if (item === "captain_name" || item === "manager_name") {
        // check if playerList has been loaded from db on completion of componentDidMount()
        // check if captain or manager value exists for the team in <td>
        if (players.length > 0 && details[item]) {
          id = players
            .filter(p => p.full_name === details[item])[0]
            .id.toString();
        }
        href = process.env.REACT_APP_GET_PLAYER + id;
        tdLinkCls = "tdLink";
      }
      if (item === "team_name") {
        // check if teamList has been loaded from db on completion of componentDidMount()
        // check if team exists in <td>
        // if (teams.length > 0 && details[item]) {
        //   id = teams
        //     .filter(t => t.team_name === details[item])[0]
        //     .id.toString();
        // }
        // href = process.env.REACT_APP_GET_TEAM + id;
        href = process.env.REACT_APP_GET_TEAM + details.id.toString();
        tdLinkCls = "tdLink";
      }
      return (
        <td key={i}>
          <a className={tdLinkCls} href={href}>
            {details[item]}
          </a>
        </td>
      );
    });
  }
  formatRows(data, players, columns) {
    return data.map(details => {
      return (
        <tr key={details.id} className="trTbl">
          {this.td(details, players, columns)}
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
                  details.team_name,
                  details.captain_name,
                  details.manager_name
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
                  details.team_name,
                  details.captain_name,
                  details.manager_name
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
          Add Team Details
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="teamNameId">
                Team Name
              </Label>
              {/* <p className="hintPara">(Hint: your team )</p> */}
              {/* </div> */}
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
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="selectCaptainId">
                Captain
              </Label>
              {/* <p className="hintPara"> (Hint: Captain team) </p> */}
              {/* </div> */}
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
              <Label for="teamNameId">Team</Label>
              <Input
                type="select"
                name="select"
                id="teamNameId"
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.teamName = e.target.value;
                  this.setState({ filterDetails });
                }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {/* {this.state.teamList.map(team => ( */}
                {this.state.filterTeamList.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.team_name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="captainId">Captain</Label>
              <Input
                type="select"
                name="select"
                id="captainId"
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.captainUserId = e.target.value;
                  this.setState({ filterDetails });
                }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {this.state.captainList.map(captain => (
                  <option key={captain.id} value={captain.id}>
                    {captain.full_name}
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
                  filterDetails.managerUserId = e.target.value;
                  this.setState({ filterDetails });
                }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {this.state.managerList.map(manager => (
                  <option key={manager.id} value={manager.id}>
                    {manager.full_name}
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
          Edit Team Details
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="teamNameId">
                Team Name
              </Label>
              {/* <p className="hintPara">(Hint: your team )</p> */}
              {/* </div> */}
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
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="selectCaptainId">
                Captain
              </Label>
              {/* <p className="hintPara">
                        (Hint: if opponent not decided, select own team)
                      </p> */}
              {/* </div> */}
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
            Add New Team
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
        teamList: res.data,
        filterTeamList: res.data
      });
      // this.state.teamList.splice(0, 0, "--Select--");
    });

    // axios.get("http://localhost:4000/getplayerlist").then(res => {
    axios.get(process.env.REACT_APP_PLAYER_LIST).then(res => {
      this.setState({
        playerList: res.data,
        captainList: res.data.filter(player => player.role_id === 2),
        managerList: res.data.filter(player => player.role_id === 3)
      });
    });
  }

  render() {
    console.log(this.state.captainList);
    console.log(this.state.managerList);
    this.tbl = new tblHeaderClass();
    return (
      <div id="pageTop">
        <NavbarDispClass
          // homeActive={false}
          // teamActive={false}
          // requestActive={false}
          userEmail={this.state.userEmail}
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
                this.state.teamList,
                this.state.playerList,
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

export default TeamTblClass;
