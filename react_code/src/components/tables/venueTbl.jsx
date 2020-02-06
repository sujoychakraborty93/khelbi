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

class VenueTblClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: this.props.userEmail,
      colHead: [
        // "Id",
        "Venue Name",
        "Street",
        "City",
        "State",
        "Zip",
        "Country"
      ],
      columns: ["venue_name", "street", "city", "state", "zip", "country"],
      editModalDisplay: false,
      deleteModalDisplay: false,
      addModalDisplay: false,
      filterModalDisplay: false,
      countryStateList: [],
      countryList: [],
      venueList: [],
      filterVenueList: [],
      cityList: [],
      zipList: [],
      addDetails: {
        venueName: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      },
      filterDetails: {
        city: "",
        state: "",
        zip: "",
        country: ""
      },

      editDetails: {
        id: null,
        venueName: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      },
      modalData: {
        id: null,
        venueName: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      },
      modalDataOriginal: {
        id: null,
        venueName: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      },
      venueNameErrMsg: "",
      streetErrMsg: "",
      cityErrMsg: "",
      stateErrMsg: "",
      zipErrMsg: "",
      countryErrMsg: "",
      msg: "",
      addMsg: "New Venue added successfully!",
      errMsg: `Sorry we encountered an error. Please report below details to the admin using 
      Contact Us link at bottom of the page. Error code: `,
      updateMsg: "Venue details updated successfully",
      delMsg: "Venue deleted!",
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
      venueNameErrMsg: "",
      streetErrMsg: "",
      cityErrMsg: "",
      stateErrMsg: "",
      zipErrMsg: "",
      countryErrMsg: "",
      addDetails: {
        venueName: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      },
      filterDetails: {
        city: "",
        state: "",
        zip: "",
        country: ""
      }
    });
  };

  hasValue(data) {
    return data !== undefined && data !== null && data !== "";
  }

  validate = data => {
    let venueNameErrMsg = "";
    let streetErrMsg = "";
    let cityErrMsg = "";
    let stateErrMsg = "";
    let zipErrMsg = "";
    let countryErrMsg = "";

    // trim the text fields that are mandatory. non-mandatory may be null, so trim them after null validation.
    data.venueName = data.venueName.trim();
    data.street = data.street.trim();
    data.city = data.city.trim();
    data.state = data.state.trim();
    data.zip = data.zip.trim();
    data.country = data.country.trim();

    // Venue name validation
    // do not validate if its not changed. But validate if its a new entry
    if (
      this.state.modalDataOriginal.venueName !== data.venueName ||
      this.state.modalDataOriginal.venueName === ""
    ) {
      // if (!data.venueName ||data.venueName.length < 1 ||!isNaN(data.venueName) ) {
      //   venueNameErrMsg =
      //     "At least one alphabet is required";
      // }
      console.log(data.venueName);
      if (!this.hasValue(data.venueName)) {
        venueNameErrMsg = "Venue cannot be blank";
      }
    }

    // street validation
    if (!this.hasValue(data.street)) {
      streetErrMsg = "Street cannot be blank";
    }

    // city validation
    if (!this.hasValue(data.city)) {
      cityErrMsg = "city cannot be blank";
    }

    // state validation
    if (!data.state || data.state === "--Select--") {
      stateErrMsg = "please select a state";
    }

    // zip validation
    if (
      this.state.modalDataOriginal.zip !== data.zip ||
      this.state.modalDataOriginal.zip === ""
    ) {
      if (!this.hasValue(data.zip)) {
        zipErrMsg = "city cannot be blank";
      }
    }

    // country validation
    if (!data.country || data.country === "--Select--") {
      countryErrMsg = "please select a country";
    }

    if (
      venueNameErrMsg ||
      streetErrMsg ||
      cityErrMsg ||
      stateErrMsg ||
      zipErrMsg ||
      countryErrMsg
    ) {
      this.setState({
        venueNameErrMsg,
        streetErrMsg,
        cityErrMsg,
        stateErrMsg,
        zipErrMsg,
        countryErrMsg
      });
      return false;
    }
    return true;
  };

  setEditModalData(id, venueName, street, city, state, zip, country) {
    this.setState({
      modalData: {
        id,
        venueName,
        street,
        city,
        state,
        zip,
        country
      },
      modalDataOriginal: {
        id,
        venueName,
        street,
        city,
        state,
        zip,
        country
      }
    });
    this.toggleEditModal();
  }

  setDeleteModalData(id, venueName, street, city, state, zip, country) {
    this.setState({
      modalData: {
        id,
        venueName,
        street,
        city,
        state,
        zip,
        country
      }
    });
    this.toggleDeleteModal();
  }

  update() {
    let isValid = this.validate(this.state.modalData);
    if (isValid) {
      let { modalData } = this.state;
      let { editDetails } = this.state;

      editDetails.id = modalData.id;
      editDetails.venueName = modalData.venueName;
      editDetails.street = modalData.street;
      editDetails.city = modalData.city;
      editDetails.state = modalData.state;
      editDetails.zip = modalData.zip;
      editDetails.country = modalData.country;
      // modalData.phone === ""
      //   ? (editDetails.phone = null)
      //   : (editDetails.phone = modalData.phone);
      // editDetails.fullName = modalData.firstName;
      // if (this.hasValue(modalData.middleName)) {
      //   editDetails.fullName += " " + modalData.middleName;
      // }
      // if (this.hasValue(modalData.lastName)) {
      //   editDetails.fullName += " " + modalData.lastName;
      // }

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

      // this.hasValue(modalData.teamName)
      //   ? (editDetails.teamId = this.state.teamList.filter(
      //       t => t.team_name === modalData.teamName
      //     )[0].id)
      //   : (editDetails.teamId = null);

      // let d = new Date();
      // let date =
      //   d.getFullYear() +
      //   "-" +
      //   (d.getMonth() + 1) +
      //   "-" +
      //   d.getDate() +
      //   " " +
      //   d.toTimeString();
      // date = date.slice(0, 19);
      // editDetails.modified = date;

      this.setState({ editDetails });
      console.log(this.state.modalData);
      console.log(this.state.editDetails);
      // const config = { headers: { "Content-Type": "application/json" } };
      axios
        .put(
          // "http://localhost:4000/put/updateteam",
          process.env.REACT_APP_UPDATE_VENUE,
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
          axios.get(process.env.REACT_APP_VENUE_LIST).then(res => {
            this.setState({
              venueList: res.data
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
        process.env.REACT_APP_DELETE_VENUE,
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
        axios.get(process.env.REACT_APP_VENUE_LIST).then(res => {
          this.setState({
            venueList: res.data
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
      axios
        .post(
          // "http://localhost:4000/post/addnewteam",
          process.env.REACT_APP_ADD_NEW_VENUE,
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
          axios.get(process.env.REACT_APP_VENUE_LIST).then(res => {
            this.setState({
              venueList: res.data
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
  filterData() {
    axios
      .get(
        // "http://localhost:4000/post/addnewmatch",
        process.env.REACT_APP_GET_VENUE,
        {
          params: {
            city: this.state.filterDetails.city,
            state: this.state.filterDetails.state,
            zip: this.state.filterDetails.zip,
            country: this.state.filterDetails.country
          }
        }
      )
      .then(res => {
        this.setState({
          venueList: res.data
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

  td(details, columns) {
    return columns.map((item, i) => {
      let href = "";
      let tdLinkCls = "";
      if (item === "venue_name") {
        // check if playerList has been loaded from db on completion of componentDidMount()
        // check if captain or manager value exists for the team in <td>
        // if (players.length > 0) {
        //   id = players
        //     .filter(p => p.full_name === details[item])[0]
        //     .id.toString();
        // }
        href = process.env.REACT_APP_GET_VENUE + details.id.toString();
        tdLinkCls = "tdLink";
      }
      // if (item === "team_name") {
      //   // check if playerList has been loaded from db on completion of componentDidMount()
      //   // check if captain or manager value exists for the team in <td>
      //   if (teams.length > 0 && details[item]) {
      //     id = teams
      //       .filter(t => t.team_name === details[item])[0]
      //       .id.toString();
      //   }
      //   href = process.env.REACT_APP_GET_TEAM + id;
      //   tdLinkCls = "tdLink";
      // }

      return (
        <td key={i}>
          <a className={tdLinkCls} href={href}>
            {details[item]}
          </a>
        </td>
      );
    });
  }
  formatRows(data, columns) {
    return data.map(details => {
      return (
        <tr key={details.id} className="trTbl">
          {this.td(details, columns)}
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
                  details.venue_name,
                  details.street,
                  details.city,
                  details.state,
                  details.zip,
                  details.country
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
                  details.venue_name,
                  details.street,
                  details.city,
                  details.state,
                  details.zip,
                  details.country
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
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  handleOnAddChange = e => {
    e.preventDefault();
    let { name, value } = e.target;
    let { addDetails } = this.state;
    addDetails[name] = value;
    this.setState({ addDetails });
  };
  addModal() {
    return (
      <Modal
        isOpen={this.state.addModalDisplay}
        toggle={this.toggleAddModal.bind(this)}
      >
        <ModalHeader toggle={this.toggleAddModal.bind(this)}>
          Add Venue Details
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="venueId">
                Venue
              </Label>
              {/* <p className="hintPara">(Hint: your team )</p> */}
              {/* </div> */}
              <Input
                type="text"
                name="venueName"
                id="venueId"
                placeholder="Venue Name"
                onChange={this.handleOnAddChange}
                // onChange={e => {
                //   let { addDetails } = this.state;
                //   addDetails.venueName = e.target.value;
                //   this.setState({ addDetails });
                //   // console.log(e.target.value);
                // }}
              ></Input>
              <p className="validationMsg">{this.state.venueNameErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="streetId">
                Street
              </Label>
              {/* <p className="hintPara">(Hint: your middleName )</p> */}
              {/* </div> */}
              <Input
                type="text"
                name="street"
                id="streetId"
                placeholder="Street"
                onChange={this.handleOnAddChange}
                // onChange={e => {
                //   let { addDetails } = this.state;
                //   addDetails.street = e.target.value;
                //   this.setState({ addDetails });
                // }}
              ></Input>
              <p className="validationMsg">{this.state.streetErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="cityId">
                City
              </Label>
              {/* <p className="hintPara">(Hint: your lastName )</p> */}
              {/* </div> */}
              <Input
                type="text"
                name="city"
                id="cityId"
                placeholder="City"
                onChange={this.handleOnAddChange}
                // onChange={e => {
                //   let { addDetails } = this.state;
                //   addDetails.city = e.target.value;
                //   this.setState({ addDetails });
                // }}
              ></Input>
              <p className="validationMsg">{this.state.cityErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="selectStateId">
                State
              </Label>
              {/* <p className="hintPara">
                        (Hint: if opponent not decided, select own team)
                      </p> */}
              {/* </div> */}
              <Input
                type="select"
                name="state"
                id="selectStateId"
                onChange={this.handleOnAddChange}
                // onChange={e => {
                //   let { addDetails } = this.state;
                //   addDetails.state = e.target.value;
                //   this.setState({ addDetails });
                // }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {this.state.addDetails.country !== ""
                  ? this.state.countryStateList
                      .filter(
                        v => v.country_name === this.state.addDetails.country
                      )
                      .map(s => (
                        <option key={s.id} value={s.state_name}>
                          {s.state_name}
                        </option>
                      ))
                  : this.state.countryStateList.map(s => (
                      <option key={s.id} value={s.state_name}>
                        {s.state_name}
                      </option>
                    ))}
              </Input>
              <p className="validationMsg">{this.state.stateErrMsg}</p>
            </FormGroup>

            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="zipId">
                ZIP/Postal Code
              </Label>
              {/* <p className="hintPara">(Hint: your lastName )</p> */}
              {/* </div> */}
              <Input
                type="text"
                name="zip"
                id="zipId"
                placeholder="ZIP/Postal Code"
                onChange={this.handleOnAddChange}
                // onChange={e => {
                //   let { addDetails } = this.state;
                //   addDetails.zip = e.target.value;
                //   this.setState({ addDetails });
                // }}
              ></Input>
              <p className="validationMsg">{this.state.zipErrMsg}</p>
            </FormGroup>
            <FormGroup>
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="selectCountryId">
                Country
              </Label>
              {/* <p className="hintPara">
                        (Hint: if opponent not decided, select own team)
                      </p> */}
              {/* </div> */}
              <Input
                type="select"
                name="country"
                id="selectCountryId"
                onChange={this.handleOnAddChange}
                // onChange={e => {
                //   let { addDetails } = this.state;
                //   addDetails.country = e.target.value;
                //   // addDetails.state = "--Select--";
                //   this.setState({ addDetails });
                // }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {this.state.countryList.map(c => (
                  // <option key={c.id} value={c.id}>
                  <option key={c.id} value={c.country_name}>
                    {c.country_name}
                  </option>
                ))}
              </Input>
              <p className="validationMsg">{this.state.countryErrMsg}</p>
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
              <Label for="cityId">City</Label>
              <Input
                type="select"
                name="select"
                id="cityId"
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.city = e.target.value;
                  this.setState({ filterDetails });
                }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {/* {this.state.teamList.map(team => ( */}
                {this.state.cityList.map((key, index) => (
                  <option key={index} value={key}>
                    {key}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="stateId">State</Label>
              <Input
                type="select"
                name="select"
                id="stateId"
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.state = e.target.value;
                  this.setState({ filterDetails });
                }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {this.state.countryStateList.map(state => (
                  <option key={state.id} value={state.state_name}>
                    {state.state_name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="zipId">ZIP/Postal Code</Label>
              <Input
                type="select"
                name="select"
                id="zipId"
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.zip = e.target.value;
                  this.setState({ filterDetails });
                }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {/* {this.state.teamList.map(team => ( */}
                {this.state.zipList.map((key, index) => (
                  <option key={index} value={key}>
                    {key}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="selectCountryId">Country</Label>
              <Input
                type="select"
                name="select"
                id="selectCountryId"
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.country = e.target.value;
                  this.setState({ filterDetails });
                }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {this.state.countryList.map(c => (
                  <option key={c.id} value={c.country_name}>
                    {c.country_name}
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
          Edit Venue Details
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="venueNameId">
                Venue Name
              </Label>
              {/* </div> */}
              <Input
                type="text"
                name="venueName"
                id="venueNameId"
                value={this.state.modalData.venueName}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.venueName = e.target.value;
                  this.setState({ modalData });
                }}
              ></Input>
              <p className="validationMsg">{this.state.venueNameErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="streetId">
                Street
              </Label>
              {/* </div> */}
              <Input
                type="text"
                name="streetName"
                id="streetId"
                value={this.state.modalData.street}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.street = e.target.value;
                  this.setState({ modalData });
                }}
              ></Input>
              <p className="validationMsg">{this.state.streetNameErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="cityId">
                City
              </Label>
              {/* </div> */}
              <Input
                type="text"
                name="city"
                id="cityId"
                value={this.state.modalData.city}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.city = e.target.value;
                  this.setState({ modalData });
                }}
              ></Input>
              <p className="validationMsg">{this.state.cityErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="selectStateId">
                State
              </Label>
              {/* </div> */}
              <Input
                type="select"
                name="selectState"
                id="selectStateId"
                value={this.state.modalData.state}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.state = e.target.value;
                  // console.log(e);
                  // console.log(e.target.textContent);
                  // console.log(e.target.innerHTML);
                  // console.log(e.target.innerText);
                  // console.log(e.target.value);
                  this.setState({ modalData });
                }}
              >
                <option key={this.state.modalData.id}>
                  {this.state.countryStateList
                    .filter(
                      v => v.country_name === this.state.modalData.country
                    )
                    .includes(this.state.modalData.state)
                    ? this.state.modalData.state
                    : "--Select--"}
                </option>
                <option disabled className="optionCls"></option>
                {this.state.countryStateList
                  .filter(v => v.country_name === this.state.modalData.country)
                  .map(s => (
                    <option key={s.id} value={s.state_name}>
                      {s.state_name}
                    </option>
                  ))}
              </Input>
              <p className="validationMsg">{this.state.stateErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="zipId">
                Zip/Postal Code
              </Label>
              <p className="hintPara">
                (Hint: e.g. 799004 / 85032 / 9999999999)
              </p>
              {/* </div> */}
              <Input
                type="text"
                name="zipName"
                id="zipId"
                value={this.state.modalData.zip}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.zip = e.target.value;
                  this.setState({ modalData });
                }}
              ></Input>
              <p className="validationMsg">{this.state.zipErrMsg}</p>
            </FormGroup>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="selectCountryId">
                Country
              </Label>
              {/* </div> */}
              <Input
                type="select"
                name="country"
                id="selectCountryId"
                value={this.state.modalData.country}
                onChange={e => {
                  let { modalData } = this.state;
                  modalData.country = e.target.value;
                  modalData.state = "--Select--";
                  this.setState({ modalData });
                }}
              >
                <option key={this.state.modalData.id}>
                  {this.state.modalData.country}
                </option>
                <option disabled className="optionCls"></option>
                {this.state.countryList.map(c => (
                  <option key={c.id} value={c.country_name}>
                    {c.country_name}
                  </option>
                ))}
              </Input>
              <p className="validationMsg">{this.state.countryErrMsg}</p>
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
            <span className="modalParaHeadSpan">Venue Name: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.venueName}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Street: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.street}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">City: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.city}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">State: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.state}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Zip: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.zip}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Country: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.country}
            </span>
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={this.delete.bind(this)}>
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
            Add New Venue
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
      venueList: this.state.filterVenueList
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
    axios.get(process.env.REACT_APP_COUNTRY_STATE_LIST).then(res => {
      this.setState({
        countryStateList: res.data
      });
    });

    axios.get(process.env.REACT_APP_COUNTRY_LIST).then(res => {
      this.setState({
        countryList: res.data
      });
    });

    axios.get(process.env.REACT_APP_VENUE_LIST).then(res => {
      this.setState({
        venueList: res.data,
        filterVenueList: res.data,
        cityList: res.data
          .map(el => {
            return el.city;
          })
          .filter(v => v !== null)
          .filter(v => v !== "null")
          .filter(v => v !== "")
          .filter(this.onlyUnique),
        zipList: res.data
          .map(el => {
            return el.zip;
          })
          .filter(v => v !== null)
          .filter(v => v !== "null")
          .filter(v => v !== "")
          .filter(this.onlyUnique)
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
            {this.viewAllBtn()}
            {this.addBtn()}
          </div>
          <Table bordered size="sm">
            <thead>
              <tr>
                {
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
                this.state.venueList,
                // this.state.countryStateList,
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

export default VenueTblClass;
