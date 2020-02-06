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
  Input,
  Label
} from "reactstrap";

// function getData() {
//   useEffect(() => {
//     axios.get("http://localhost:4000").then(res => {
//       this.setState({
//         matchDetails: res.data
//       });
//     });
//   }, []);
// }
class MatchScheduleTblClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colHead: [
        // "Id",
        "Date",
        "Time",
        "Home Team",
        "Away Team",
        "Venue",
        "Address",
        "Umpire",
        "Match Type"
      ],
      columns: [
        "date",
        "time",
        "Home_Team",
        "Away_Team",
        "venue_name",
        "Address",
        "full_name",
        "match_type"
      ],
      editModalDisplay: false,
      deleteModalDisplay: false,
      addModalDisplay: false,
      filterModalDisplay: false,
      addDetails: {
        date: "",
        time: "",
        hTeam: null,
        aTeam: null,
        venue: null,
        umpire: null,
        matchType: ""
      },
      filterDetails: {
        date: "",
        time: "",
        teamId: null,
        venue: null,
        umpire: null,
        matchType: ""
      },

      editDetails: {
        id: null,
        date: "",
        time: "",
        hTeam: null,
        aTeam: null,
        venue: null,
        umpire: null,
        mType: ""
      },
      modalData: {
        id: null,
        date: "",
        time: "",
        hTeam: "",
        aTeam: "",
        venue: "",
        umpire: "",
        mType: ""
      },
      dateErrMsg: "",
      timeErrMsg: "",
      hTeamErrMsg: "",
      aTeamErrMsg: "",
      venueErrMsg: "",
      umpireErrMsg: "",
      mTypeErrMsg: "",
      matchDetails: [],
      filterMatchDetails: [],
      matchTypeValues: [],
      matchTypesList: [],
      teamList: [],
      venueList: [],
      umpireList: [],
      msg: "",
      addMsg: "New match added successfully!",
      errMsg: `Sorry we encountered an error. Please report below details to the admin using 
      Contact Us link at bottom of the page`,
      updateMsg: "Match details updated successfully",
      delMsg: "Match deleted!",
      matchesLink: this.props.matchesLink,
      userEmail: this.props.userEmail,
      header: this.props.header,
      fromPage: this.props.fromPage,
      showAdd: false,
      showEdit: true,
      showDelete: false
    };
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  toggleEditMatchModal() {
    this.setState(prevState => ({
      editModalDisplay: !prevState.editModalDisplay
    }));
    this.resetStates();
  }
  toggleDeleteMatchModal() {
    this.setState(prevState => ({
      deleteModalDisplay: !prevState.deleteModalDisplay
    }));
    this.resetStates();
  }
  toggleAddMatchModal() {
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
      dateErrMsg: "",
      timeErrMsg: "",
      hTeamErrMsg: "",
      aTeamErrMsg: "",
      venueErrMsg: "",
      umpireErrMsg: "",
      mTypeErrMsg: "",
      addDetails: {
        date: "",
        time: "",
        hTeam: null,
        aTeam: null,
        venue: null,
        umpire: null,
        matchType: ""
      },
      filterDetails: {
        date: "",
        time: "",
        teamId: null,
        venue: null,
        umpire: null,
        matchType: ""
      }
    });
  };

  validate = data => {
    let dateErrMsg = "";
    let timeErrMsg = "";
    let hTeamErrMsg = "";
    let aTeamErrMsg = "";
    let venueErrMsg = "";
    let umpireErrMsg = "";
    let mTypeErrMsg = "";

    if (!data.date || data.date === "") {
      dateErrMsg = "please enter a valid date in mm/dd/yyyy format";
    }

    if (!data.time) {
      timeErrMsg = "please enter a valid time in HH:MM:AM/PM format";
    }
    if (!data.hTeam || data.hTeam === "--Select--") {
      hTeamErrMsg = "please select a team (e.g. your team)";
    }

    if (!data.aTeam || data.aTeam === "--Select--") {
      aTeamErrMsg = `please select a team (e.g. opponent team) or select
      own team if opponent not yet decided or its a practise session`;
    }

    if (
      dateErrMsg ||
      timeErrMsg ||
      hTeamErrMsg ||
      aTeamErrMsg ||
      venueErrMsg ||
      umpireErrMsg ||
      mTypeErrMsg
    ) {
      this.setState({
        dateErrMsg,
        timeErrMsg,
        hTeamErrMsg,
        aTeamErrMsg,
        venueErrMsg,
        umpireErrMsg,
        mTypeErrMsg
      });
      return false;
    }
    return true;
  };

  setEditMatchModalData(id, date, time, hTeam, aTeam, venue, umpire, mType) {
    this.setState({
      modalData: { id, date, time, hTeam, aTeam, venue, umpire, mType }
    });
    this.toggleEditMatchModal();
  }
  setDeleteMatchModalData(id, date, time, hTeam, aTeam, venue, umpire, mType) {
    this.setState({
      modalData: { id, date, time, hTeam, aTeam, venue, umpire, mType }
    });
    this.toggleDeleteMatchModal();
  }
  hasValue(data) {
    return data !== undefined && data !== null && data !== "";
  }

  editMatch() {
    let isValid = this.validate(this.state.modalData);
    if (isValid) {
      let { modalData } = this.state;
      let { editDetails } = this.state;

      editDetails.id = modalData.id;
      editDetails.date = modalData.date;
      editDetails.time = modalData.time;
      if (this.hasValue(modalData.hTeam)) {
        editDetails.hTeam = this.state.teamList.filter(
          team => team.team_name === modalData.hTeam
        )[0].id;
      }
      // this.hasValue(modalData.hTeam)
      //   ? (editDetails.hTeam = this.state.teamList.filter(
      //       team => team.team_name === modalData.hTeam
      //     )[0].id)
      //   : (editDetails.hTeam = null);
      if (this.hasValue(modalData.aTeam)) {
        editDetails.aTeam = this.state.teamList.filter(
          team => team.team_name === modalData.aTeam
        )[0].id;
      }
      // this.hasValue(modalData.aTeam)
      //   ? (editDetails.aTeam = this.state.teamList.filter(
      //       team => team.team_name === modalData.aTeam
      //     )[0].id)
      //   : (editDetails.aTeam = null);

      this.hasValue(modalData.venue)
        ? (editDetails.venue = this.state.venueList.filter(
            venue => venue.venue_name === modalData.venue
          )[0].id)
        : (editDetails.venue = null);

      this.hasValue(modalData.umpire)
        ? (editDetails.umpire = this.state.umpireList.filter(
            umpire => umpire.full_name === modalData.umpire
          )[0].id)
        : (editDetails.umpire = null);

      this.hasValue(modalData.mType)
        ? (editDetails.mType = modalData.mType)
        : (editDetails.mType = "");

      this.setState({ editDetails });
      console.log(this.state.modalData);
      console.log(this.state.editDetails);
      // const config = { headers: { "Content-Type": "application/json" } };
      axios
        .put(
          // "http://localhost:4000/put/updatematch",
          process.env.REACT_APP_UPDATE_MATCH,
          this.state.editDetails
          // config
        )
        .then(res => {
          this.setState({
            // msg: this.state.updateMsg + res.data
            msg:
              res.status === 200
                ? this.state.updateMsg
                : "status code " + res.status + "\n" + this.state.errMsg
          });
          axios.get(this.state.matchesLink).then(res => {
            this.setState({
              matchDetails: res.data
            });
          });
          // this.props.fetchmessage(this.state.addMsg);
          // this.setState(prevState => ({
          //   editModalDisplay: !prevState.editModalDisplay
          // }));
          this.toggleEditMatchModal();
          // page is refreshed / page refresh
          // window.location.reload();
        })
        .catch(error => {
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
          this.toggleEditMatchModal();
          // this.props.fetchmessage(this.state.errMsg);
        });
    }
  }

  deleteMatch() {
    axios
      .delete(
        // "http://localhost:4000/post/addnewmatch",
        process.env.REACT_APP_DELETE_MATCH,
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
        axios.get(this.state.matchesLink).then(res => {
          this.setState({
            matchDetails: res.data
          });
        });
        // this.props.fetchmessage(this.state.addMsg);
        // this.setState(prevState => ({
        //   addModalDisplay: !prevState.addModalDisplay
        // }));
        this.toggleDeleteMatchModal();
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
        this.toggleDeleteMatchModal();
        // this.props.fetchmessage(this.state.errMsg);
      });
  }

  addNewMatch() {
    let isValid = this.validate(this.state.addDetails);
    if (isValid) {
      console.log(this.state.addDetails);
      axios
        .post(
          // "http://localhost:4000/post/addnewmatch",
          process.env.REACT_APP_ADD_NEW_MATCH,
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
          axios.get(this.state.matchesLink).then(res => {
            this.setState({
              matchDetails: res.data
            });
          });
          // this.props.fetchmessage(this.state.addMsg);
          // this.setState(prevState => ({
          //   addModalDisplay: !prevState.addModalDisplay
          // }));
          this.toggleAddMatchModal();
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
          this.toggleAddMatchModal();
          // this.props.fetchmessage(this.state.errMsg);
        });
    }
  }
  filterData() {
    console.log(this.state.filterDetails.teamId);
    console.log(this.state.filterDetails.venue);
    axios
      .get(
        // "http://localhost:4000/post/addnewmatch",
        process.env.REACT_APP_GET_MATCH,
        {
          withCredentials: true,
          params: {
            date: this.state.filterDetails.date,
            time: this.state.filterDetails.time,
            team_id: this.state.filterDetails.teamId,
            venue_id: this.state.filterDetails.venue,
            match_type: this.state.filterDetails.matchType,
            umpire_id: this.state.filterDetails.umpire
          }
        }
      )
      .then(res => {
        this.setState({
          matchDetails: res.data
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

  td = (details, teams, venues, umpires, columns) => {
    return columns.map((item, i) => {
      let href = "";
      let tdLinkCls = "";
      let id = "";
      let user_id = "";
      if (item === "Home_Team" || item === "Away_Team") {
        if (teams.length > 0) {
          id = teams
            .filter(t => t.team_name === details[item])[0]
            .id.toString();
        }
        href = process.env.REACT_APP_GET_TEAM + id;
        tdLinkCls = "tdLink";
      }
      if (item === "venue_name") {
        // console.log(venues);
        if (venues.length > 0 && details[item]) {
          id = venues
            .filter(v => v.venue_name === details[item])[0]
            .id.toString();
        }
        href = process.env.REACT_APP_GET_VENUE + id;
        tdLinkCls = "tdLink";
      }
      if (item === "full_name") {
        if (umpires.length > 0 && details[item]) {
          user_id = umpires
            .filter(u => u.full_name === details[item])[0]
            .user_id.toString();
        }
        href = process.env.REACT_APP_GET_PLAYER + user_id;
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
  };
  formatRows(data, teams, venues, umpires, columns) {
    return data.map(details => {
      return (
        <tr key={details.id} className="trTbl">
          {/* <td>{details.id}</td> */}
          {/* <td>{details.date}</td>
          <td>{details.time}</td>
          <td>{details.Home_Team}</td>
          <td>{details.Away_Team}</td>
          <td>{details.venue_name}</td>
          <td>{details.Address}</td>
          <td>{details.full_name}</td>
          <td>{details.match_type}</td> */}
          {this.td(details, teams, venues, umpires, columns)}
          {this.state.showEdit ? (
            <td>
              <Button
                color="info"
                className="mr-1"
                size="sm"
                // onClick={this.toggleEditMatchModal.bind(this)}
                onClick={this.setEditMatchModalData.bind(
                  this,
                  details.id,
                  details.date,
                  details.time,
                  details.Home_Team,
                  details.Away_Team,
                  details.venue_name,
                  details.full_name,
                  details.match_type
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
                // onClick={this.toggleDeleteMatchModal.bind(this)}
                // onClick={this.setDeleteModalData.bind(
                onClick={this.setDeleteMatchModalData.bind(
                  this,
                  details.id,
                  details.date,
                  details.time,
                  details.Home_Team,
                  details.Away_Team,
                  details.venue_name,
                  details.full_name,
                  details.match_type
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
        toggle={this.toggleAddMatchModal.bind(this)}
      >
        <ModalHeader toggle={this.toggleAddMatchModal.bind(this)}>
          Add Match Details
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="dateId">
                Date
              </Label>
              <p className="hintPara">
                (Hint: if not decided, select any date now and change it later)
              </p>
              {/* </div> */}
              <Input
                type="date"
                name="date"
                id="dateId"
                placeholder="date placeholder"
                // value={this.state.addDetails.date}
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.date = e.target.value;
                  this.setState({ addDetails });
                }}
              />
              <p className="validationMsg">{this.state.dateErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              <Label className="labelRequired" for="timeId">
                Time
              </Label>
              <Input
                type="time"
                name="time"
                id="timeId"
                placeholder="time placeholder"
                // value={this.state.addDetails.time}
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.time = e.target.value;
                  this.setState({ addDetails });
                }}
              />
              <p className="validationMsg">{this.state.timeErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="selectHomeTeamId">
                Home Team
              </Label>
              <p className="hintPara">(Hint: your team )</p>
              {/* </div> */}
              <Input
                type="select"
                name="select"
                id="selectHomeTeamId"
                // value={this.state.addDetails.hTeam}
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.hTeam = e.target.value;
                  this.setState({ addDetails });
                }}
              >
                <option key="0">--Select--</option>
                {this.state.teamList.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.team_name}
                  </option>
                ))}
              </Input>
              <p className="validationMsg">{this.state.hTeamErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="selectAwayTeamId">
                Away Team
              </Label>
              <p className="hintPara">
                (Hint: if opponent not decided/practice, select own team)
              </p>
              {/* </div> */}
              <Input
                type="select"
                name="select"
                id="selectAwayTeamId"
                // value={this.state.addDetails.aTeam}
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.aTeam = e.target.value;
                  this.setState({ addDetails });
                }}
              >
                <option key="0">--Select--</option>
                {this.state.teamList.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.team_name}
                  </option>
                ))}
              </Input>
              <p className="validationMsg">{this.state.aTeamErrMsg}</p>
            </FormGroup>
            <FormGroup>
              <Label for="selectVenueId">Venue</Label>
              <Input
                type="select"
                name="select"
                id="selectVenueId"
                // value={this.state.addDetails.venue}
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.venue = e.target.value;
                  this.setState({ addDetails });
                }}
              >
                <option key="0">--Select--</option>
                {this.state.venueList.map(venue => (
                  <option key={venue.id} value={venue.id}>
                    {venue.venue_name}
                  </option>
                ))}
              </Input>
              <p className="validationMsg">{this.state.venueErrMsg}</p>
            </FormGroup>
            <FormGroup>
              <Label for="selectUmpireId">Umpire</Label>
              <Input
                type="select"
                name="select"
                id="selectUmpireId"
                // value={this.state.addDetails.umpire}
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.umpire = e.target.value;
                  this.setState({ addDetails });
                }}
              >
                <option key="0">--Select--</option>
                {this.state.umpireList.map(umpire => (
                  <option key={umpire.id} value={umpire.id}>
                    {umpire.full_name}
                  </option>
                ))}
              </Input>
              <p className="validationMsg">{this.state.umpireErrMsg}</p>
            </FormGroup>
            <FormGroup>
              <Label for="selectMatchTypeId">Match Type</Label>
              <Input
                type="select"
                name="select"
                id="selectMatchTypeId"
                // value={this.state.addDetails.matchType}
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.matchType = e.target.value;
                  this.setState({ addDetails });
                }}
              >
                <option key="0">--Select--</option>
                {this.state.matchTypesList.map((key, index) => (
                  <option key={index} value={key}>
                    {key}
                  </option>
                ))}
              </Input>
              <p className="validationMsg">{this.state.mTypeErrMsg}</p>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.addNewMatch.bind(this)}>
            Save
          </Button>{" "}
          <Button
            color="secondary"
            onClick={this.toggleAddMatchModal.bind(this)}
          >
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
              <Label for="dateId">Date</Label>
              <Input
                type="date"
                name="date"
                id="dateId"
                placeholder="date placeholder"
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.date = e.target.value;
                  this.setState({ filterDetails });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="timeId">Time</Label>
              <Input
                type="time"
                name="time"
                id="timeId"
                placeholder="time placeholder"
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.time = e.target.value;
                  this.setState({ filterDetails });
                }}
              />
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
                <option key="0">--Select--</option>
                {this.state.teamList.map(team => (
                  <option key={team.id} value={team.id}>
                    {team.team_name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="selectVenueId">Venue</Label>
              <Input
                type="select"
                name="select"
                id="selectVenueId"
                // value={this.state.addDetails.venue}
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.venue = e.target.value;
                  this.setState({ filterDetails });
                }}
              >
                <option key="0">--Select--</option>
                {this.state.venueList.map(venue => (
                  <option key={venue.id} value={venue.id}>
                    {venue.venue_name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="selectUmpireId">Umpire</Label>
              <Input
                type="select"
                name="select"
                id="selectUmpireId"
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.umpire = e.target.value;
                  this.setState({ filterDetails });
                }}
              >
                <option key="0">--Select--</option>
                {this.state.umpireList.map(umpire => (
                  <option key={umpire.id} value={umpire.id}>
                    {umpire.full_name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="selectMatchTypeId">Match Type</Label>
              <Input
                type="select"
                name="select"
                id="selectMatchTypeId"
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.matchType = e.target.value;
                  this.setState({ filterDetails });
                }}
              >
                <option key="0">--Select--</option>
                {this.state.matchTypesList.map((key, index) => (
                  <option key={index} value={key}>
                    {key}
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
        toggle={this.toggleEditMatchModal.bind(this)}
      >
        <ModalHeader toggle={this.toggleEditMatchModal.bind(this)}>
          Edit Match Details
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="dateId">
                Date
              </Label>
              <p className="hintPara">
                (Hint: if not decided, select any date now and change it later)
              </p>
              {/* </div> */}
              <Input
                type="date"
                name="date"
                id="dateId"
                // placeholder="date placeholder"
                // defaultValue={details.date}
                value={this.state.modalData.date}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.date = e.target.value;
                  this.setState({ modalData });
                }}
              ></Input>
              <p className="validationMsg">{this.state.dateErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              <Label className="labelRequired" for="timeId">
                Time
              </Label>
              <Input
                type="time"
                name="time"
                id="timeId"
                // placeholder="time placeholder"
                // defaultValue={details.time}
                value={this.state.modalData.time}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.time = e.target.value;
                  this.setState({ modalData });
                }}
              />
              <p className="validationMsg">{this.state.timeErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="selectHomeTeamId">
                Home Team
              </Label>
              <p className="hintPara">(Hint: your team )</p>
              {/* </div> */}
              <Input
                type="select"
                name="select"
                id="selectHomeTeamId"
                // defaultValue={details.Home_Team}
                // value={this.state.modalData.hTeam}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.hTeam = e.target.value;
                  this.setState({ modalData });
                }}
              >
                <option key={this.state.modalData.id}>
                  {this.state.modalData.hTeam}
                </option>
                <option disabled className="optionCls"></option>
                {this.state.teamList.map(team => (
                  <option key={team.id} value={team.team_name}>
                    {team.team_name}
                  </option>
                ))}
                {/* <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option> */}
              </Input>
              <p className="validationMsg">{this.state.hTeamErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="selectAwayTeamId">
                Away Team
              </Label>
              <p className="hintPara">
                (Hint: if opponent not decided, select own team)
              </p>
              {/* </div> */}
              <Input
                type="select"
                name="select"
                id="selectAwayTeamId"
                // defaultValue={details.Away_Team}
                // value={this.state.modalData.aTeam}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.aTeam = e.target.value;
                  this.setState({ modalData });
                }}
              >
                <option key={this.state.modalData.id}>
                  {this.state.modalData.aTeam}
                </option>
                {/* <option disabled className="optionCls">
                        ────────────────────────────────────────────
                      </option> */}
                <option disabled className="optionCls"></option>
                {/* <hr /> */}
                {this.state.teamList.map(team => (
                  <option key={team.id} value={team.team_name}>
                    {team.team_name}
                  </option>
                ))}
              </Input>
              <p className="validationMsg">{this.state.aTeamErrMsg}</p>
            </FormGroup>
            <FormGroup>
              <Label for="selectVenueId">Venue</Label>
              <Input
                type="select"
                name="select"
                id="selectVenueId"
                // defaultValue={details.venue_name}
                // value={this.state.modalData.venue}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.venue = e.target.value;
                  this.setState({ modalData });
                }}
              >
                <option key={this.state.modalData.id}>
                  {this.state.modalData.venue}
                </option>
                <option disabled className="optionCls"></option>
                {this.state.venueList.map(venue => (
                  <option key={venue.id} value={venue.venue_name}>
                    {venue.venue_name}
                  </option>
                ))}
              </Input>
              <p className="validationMsg">{this.state.venueErrMsg}</p>
            </FormGroup>
            <FormGroup>
              <Label for="selectUmpireId">Umpire</Label>
              <Input
                type="select"
                name="select"
                id="selectUmpireId"
                // defaultValue={details.full_name}
                // value={this.state.modalData.umpire}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.umpire = e.target.value;
                  this.setState({ modalData });
                }}
              >
                <option key={this.state.modalData.id}>
                  {this.state.modalData.umpire}
                </option>
                <option disabled className="optionCls"></option>
                {this.state.umpireList.map(umpire => (
                  <option key={umpire.id} value={umpire.full_name}>
                    {umpire.full_name}
                  </option>
                ))}
              </Input>
              <p className="validationMsg">{this.state.umpireErrMsg}</p>
            </FormGroup>
            <FormGroup>
              <Label for="selectMatchTypeid">Match Type</Label>
              <Input
                type="select"
                name="select"
                id="selectMatchTypeid"
                // defaultValue={details.match_type}
                // value={this.state.modalData.mType}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.mType = e.target.value;
                  this.setState({ modalData });
                }}
              >
                <option key={this.state.modalData.id}>
                  {this.state.modalData.mType}
                </option>
                <option disabled className="optionCls"></option>
                {this.state.matchTypesList.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </Input>
              <p className="validationMsg">{this.state.mTypeErrMsg}</p>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            // onClick={this.toggleEditMatchModal.bind(this)}
            onClick={this.editMatch.bind(this)}
          >
            Save
          </Button>{" "}
          <Button
            color="secondary"
            onClick={this.toggleEditMatchModal.bind(this)}
          >
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
        toggle={this.toggleDeleteMatchModal.bind(this)}
      >
        <ModalHeader toggle={this.toggleDeleteMatchModal.bind(this)}>
          Delete
        </ModalHeader>
        <ModalBody>
          <h6 className="colorRed">
            Do you want to delete this match? It cannot be recovered after
            deletion
          </h6>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Id: </span>
            <span className="modalParaDataSpan">{this.state.modalData.id}</span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Date: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.date}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Time: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.time}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Home Team: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.hTeam}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Away Team: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.aTeam}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Venue: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.venue}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Umpire: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.umpire}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Match Type: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.mType}
            </span>
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="warning"
            // onClick={this.toggleDeleteMatchModal.bind(this)}
            onClick={this.deleteMatch.bind(this)}
          >
            Confirm Delete
          </Button>{" "}
          <Button
            color="secondary"
            onClick={this.toggleDeleteMatchModal.bind(this)}
          >
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
            onClick={this.toggleAddMatchModal.bind(this)}
          >
            Add New Match
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
  handleOnViewAllClick = () => {
    this.setState({
      matchDetails: this.state.filterMatchDetails
    });
  };
  viewAllBtn() {
    return (
      <div>
        <Button
          color="info"
          className="mb-2 mr-2"
          //   size="sm"
          onClick={this.handleOnViewAllClick}
        >
          View All
        </Button>
      </div>
    );
  }

  componentDidMount() {
    // axios.get("http://localhost:4000/getmyteammatches").then(res => {
    axios
      .get(
        this.state.matchesLink,
        {
          params: { email_id: this.state.userEmail },
          withCredentials: true
        }
        // { withCredentials: true }
      )
      .then(res => {
        this.setState({
          matchDetails: res.data,
          filterMatchDetails: res.data,
          matchTypeValues: res.data
            .map(el => {
              return el.match_type;
            })
            .filter(v => v !== null), //filter(v => v.text !== null)
          // matchTypesList: this.state.matchTypeValues.filter(this.onlyUnique)
          matchTypesList: res.data
            .map(el => {
              return el.match_type;
            })
            .filter(v => v !== null)
            .filter(v => v !== "null")
            .filter(v => v !== "")
            .filter(this.onlyUnique)
        });
      });

    // axios.get("http://localhost:4000/getteamlist").then(res => {
    axios.get(process.env.REACT_APP_TEAM_LIST).then(res => {
      this.setState({
        teamList: res.data
      });
      // this.state.teamList.splice(0, 0, "--Select--");
    });
    // axios.get("http://localhost:4000/getvenuelist").then(res => {
    axios.get(process.env.REACT_APP_VENUE_LIST).then(res => {
      this.setState({
        venueList: res.data
      });
    });
    // axios.get("http://localhost:4000/getumpirelist").then(res => {
    axios.get(process.env.REACT_APP_UMPIRE_LIST).then(res => {
      this.setState({
        umpireList: res.data
      });
    });
  }

  render() {
    this.tbl = new tblHeaderClass();
    return (
      <div id="pageTop">
        <NavbarDispClass
          // homeActive={false}
          // matchActive={false}
          // requestActive={false}
          userEmail={this.state.userEmail}
        />
        <div className="container">
          {this.addModal()}
          {this.editModal()}
          {this.deleteModal()}
          {this.filterModal()}
          <h1 className="pageHead">{this.state.header}</h1>
          <this.alrt />
          <div className="add-filter-btn">
            {this.filterBtn()}
            {this.viewAllBtn()}
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
                this.state.matchDetails,
                this.state.teamList,
                this.state.venueList,
                this.state.umpireList,
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

export default MatchScheduleTblClass;
