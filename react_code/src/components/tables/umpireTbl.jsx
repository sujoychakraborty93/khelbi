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

class UmpireTblClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: this.props.userEmail,
      colHead: ["Umpire Id", "Player Id", "Umpire Name"],
      columns: ["id", "user_id", "full_name"],
      editModalDisplay: false,
      deleteModalDisplay: false,
      addModalDisplay: false,
      filterModalDisplay: false,
      playerList: [],
      umpireList: [],
      filterUmpireList: [],
      addDetails: {
        userId: null
      },
      filterDetails: {
        userId: ""
      },

      editDetails: {
        id: null,
        userId: null
      },
      modalData: {
        id: null,
        umpireName: "",
        userId: ""
      },
      umpireNameErrMsg: "",
      msg: "",
      addMsg: "New Umpire added successfully!",
      errMsg: `Sorry we encountered an error. Please report below details to the admin using 
      Contact Us link at bottom of the page. Error code: `,
      updateMsg: "Umpire details updated successfully",
      delMsg: "Umpire deleted!",
      showAdd: false,
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
      umpireNameErrMsg: "",
      addDetails: {
        userId: null
      },
      filterDetails: {
        userId: ""
      }
    });
  };

  hasValue(data) {
    return data !== undefined && data !== null && data !== "";
  }

  validate = data => {
    let umpireNameErrMsg = "";

    // Umpire name validation
    if (!this.hasValue(data.userId)) {
      umpireNameErrMsg = "Please select a user as umpire";
    }
    if (
      this.state.umpireList.filter(u => u.user_id.toString() === data.userId)
        .length !== 0
    ) {
      umpireNameErrMsg =
        "User is already an umpire. Please select a different user";
    }
    if (umpireNameErrMsg) {
      this.setState({
        umpireNameErrMsg
      });
      return false;
    }
    return true;
  };

  setEditModalData(id, umpireName, userId) {
    this.setState({
      modalData: {
        id,
        umpireName,
        userId
      }
    });
    this.toggleEditModal();
  }

  setDeleteModalData(id, umpireName, userId) {
    this.setState({
      modalData: {
        id,
        umpireName,
        userId
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
      editDetails.userId = this.state.playerList.filter(
        player => player.full_name === modalData.umpireName
      )[0].id;

      this.setState({ editDetails });
      console.log(this.state.modalData);
      console.log(this.state.editDetails);
      // const config = { headers: { "Content-Type": "application/json" } };
      axios
        .put(
          // "http://localhost:4000/put/updateteam",
          process.env.REACT_APP_UPDATE_UMPIRE,
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
          axios.get(process.env.REACT_APP_UMPIRE_LIST).then(res => {
            this.setState({
              umpireList: res.data
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
        process.env.REACT_APP_DELETE_UMPIRE,
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
        axios.get(process.env.REACT_APP_UMPIRE_LIST).then(res => {
          this.setState({
            umpireList: res.data
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
          process.env.REACT_APP_ADD_NEW_UMPIRE,
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
          axios.get(process.env.REACT_APP_UMPIRE_LIST).then(res => {
            this.setState({
              umpireList: res.data
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
    console.log(this.state.filterDetails.teamName);
    axios
      .get(
        // "http://localhost:4000/post/addnewmatch",
        process.env.REACT_APP_GET_UMPIRE,
        {
          params: {
            user_id: this.state.filterDetails.userId
          }
        }
      )
      .then(res => {
        this.setState({
          umpireList: res.data
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
      if (item === "full_name") {
        // check if playerList has been loaded from db on completion of componentDidMount()
        // check if captain or manager value exists for the team in <td>
        if (players.length > 0) {
          id = players
            .filter(p => p.full_name === details[item])[0]
            .id.toString();
        }
        // href = process.env.REACT_APP_GET_PLAYER + details.id.toString();
        href = process.env.REACT_APP_GET_PLAYER + id;
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
          {this.state.showDelete ? (
            <td>
              {/* <Button
              color="info"
              className="mr-1"
              size="sm"
              // onClick={this.toggleEditModal.bind(this)}
              onClick={this.setEditModalData.bind(
                this,
                details.id,
                details.user_id,
                details.full_name
              )}
            >
              Edit
            </Button> */}

              <Button
                color="danger"
                size="sm"
                // onClick={this.toggleDeleteModal.bind(this)}
                onClick={this.setDeleteModalData.bind(
                  this,
                  details.id,
                  details.user_id,
                  details.full_name
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
          Add Umpire Details
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="formRequired">
              {/* <div className="inLine"> */}
              <Label className="labelRequired" for="selectUmpireId">
                Umpire Name
              </Label>
              {/* <p className="hintPara">
                        (Hint: if opponent not decided, select own team)
                      </p> */}
              {/* </div> */}
              <Input
                type="select"
                name="umpireName"
                id="selectUmpireId"
                onChange={e => {
                  let { addDetails } = this.state;
                  addDetails.userId = e.target.value;
                  this.setState({ addDetails });
                }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {this.state.playerList.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.full_name}
                  </option>
                ))}
              </Input>
              <p className="validationMsg">{this.state.umpireNameErrMsg}</p>
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
              <Label for="umpireId">Umpire Name</Label>
              <Input
                type="select"
                name="select"
                id="umpireId"
                onChange={e => {
                  let { filterDetails } = this.state;
                  filterDetails.userId = e.target.value;
                  this.setState({ filterDetails });
                }}
              >
                <option key="0" value="--Select--">
                  --Select--
                </option>
                {/* {this.state.teamList.map(team => ( */}
                {this.state.filterUmpireList.map(u => (
                  <option key={u.id} value={u.user_id}>
                    {u.full_name}
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

  // getUniqueUsers(players, umpires){
  //   let result = [];
  //   for (var x in players) {
  //     if (players[x] !== )
  //   }
  // }

  // editModal() {
  //   return (
  //     <Modal
  //       isOpen={this.state.editModalDisplay}
  //       toggle={this.toggleEditModal.bind(this)}
  //     >
  //       <ModalHeader toggle={this.toggleEditModal.bind(this)}>
  //         Edit Umpire Details
  //       </ModalHeader>
  //       <ModalBody>
  //         <Form>
  //           <FormGroup className="formRequired">
  //             <div className="inLine">
  //               <Label className="labelRequired" for="selectUmpireId">
  //                 State
  //               </Label>
  //             </div>
  //             <Input
  //               type="select"
  //               name="selectUmpireName"
  //               id="selectUmpireId"
  //               value={this.state.modalData.umpireName}
  //               onChange={e => {
  //                 let { modalData } = this.state;
  //                 modalData.umpireName = e.target.value;
  //                 this.setState({ modalData });
  //               }}
  //             >
  //               <option key={this.state.modalData.id}>
  //                 {this.state.modalData.umpireName}
  //               </option>
  //               <option disabled className="optionCls"></option>
  //               {this.state.playerList.map(p => (
  //                 <option key={p.id} value={p.full_name}>
  //                   {p.full_name}
  //                 </option>
  //               ))}
  //             </Input>
  //             <p className="validationMsg">{this.state.umpireNameErrMsg}</p>
  //           </FormGroup>
  //         </Form>
  //       </ModalBody>
  //       <ModalFooter>
  //         <Button
  //           color="primary"
  //           // onClick={this.toggleEditModal.bind(this)}
  //           onClick={this.update.bind(this)}
  //         >
  //           Save
  //         </Button>{" "}
  //         <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>
  //           Cancel
  //         </Button>
  //       </ModalFooter>
  //     </Modal>
  //   );
  // }

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
            <span className="modalParaHeadSpan">Umpire Name: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.umpireName}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">User/Player Id: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.userId}
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
            Add Umpire
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
      umpireList: this.state.filterUmpireList
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
    axios.get(process.env.REACT_APP_UMPIRE_LIST).then(res => {
      this.setState({
        umpireList: res.data,
        filterUmpireList: res.data
      });
    });

    axios.get(process.env.REACT_APP_PLAYER_LIST).then(res => {
      this.setState({
        playerList: res.data
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
          {/* {this.editModal()} */}
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
                  (this.state.showDelete &&
                  this.state.colHead.slice(-1)[0] !== "Delete"
                    ? this.state.colHead.push("Delete")
                    : null,
                  this.tbl.createHeader(this.state.colHead))
                }
              </tr>
            </thead>
            <tbody>
              {this.formatRows(
                this.state.umpireList,
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

export default UmpireTblClass;
