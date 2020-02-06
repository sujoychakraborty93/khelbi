import React, { Component } from "react";
import axios from "axios";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter
} from "reactstrap";
import { NavLink, withRouter } from "react-router-dom";

class RequestDetailsTblClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: this.props.userEmail,
      // requestId: this.props.requestId,
      requestData: this.props.requestData,
      msg: this.props.msg ? this.props.msg : "",
      user: this.props.user,
      // comments: this.props.comment,
      comments: [],
      commentList: [],
      requestTemplateList: [],
      sportTypeList: [],
      requestStatusList: [],
      matchList: [],
      userImageDataList: [],
      header: "Request Details",
      addComment: {
        requestId: "",
        comment: "",
        userId: "",
        created: "",
        lastModified: ""
      },
      addToCommentList: {
        id: null,
        request_id: null,
        comment: "",
        user_id: null,
        full_name: "",
        email_id: "",
        created: "",
        last_modified: ""
      },
      modalDataComment: {
        id: null,
        request_id: null,
        comment: "",
        user_id: null,
        full_name: "",
        email_id: "",
        created: "",
        last_modified: ""
      },
      editedCommentData: {
        id: null,
        request_id: null,
        comment: "",
        user_id: null,
        full_name: "",
        email_id: "",
        created: "",
        last_modified: ""
      },
      editRequestModalDisplay: false,
      deleteRequestModalDisplay: false,
      editCommentModalDisplay: false,
      deleteCommentModalDisplay: false,
      modalData: {
        id: null,
        title: "",
        description: "",
        requestStatus: "",
        sportType: "",
        address: "",
        date: "",
        time: "",
        matchId: ""
      },
      modalDataOriginal: {
        id: null,
        title: "",
        description: "",
        requestStatus: "",
        sportType: "",
        address: "",
        date: "",
        time: "",
        matchId: ""
      },
      editRequestData: {
        id: null,
        title: "",
        requestTemplateId: null,
        description: "",
        requestorId: null,
        requestStatusId: null,
        sportType: "",
        address: "",
        date: "",
        time: "",
        matchId: null,
        lastModified: ""
      },
      editRequestDataToUpdate: {
        id: null,
        title: "",
        request_template: null,
        description: "",
        requestor: null,
        email_id: "",
        phone_no: "",
        request_status: null,
        sport_type: "",
        address: "",
        date: "",
        time: "",
        match_id: null,
        created: "",
        last_modified: ""
      },
      originalComment: "",
      addCommentMsg: "comment added!",
      errMsg: "error!",
      updateRequestMsg: "request updated!",
      deleteRequestMsg: "request deleted!",
      updateCommentMsg: "comment updated!",
      deleteCommentMsg: "comment deleted!",
      showEditRequest: false,
      showEditComment: false
      //   cols: [
      //     "sport_type",
      //     "requestor",
      //     "title",
      //     "created",
      //     "description",
      //     "address",
      //     "date",
      //     "time",
      //     "request_status"
      //   ]
      // colsRequest: ["id", "title", "request_template", "description", "requestor", "email_id", "phone_no",
      // "request_status", "sport_type", "address", "date", "time", "match_id",
      // "created", "last_modified"]

      // colsComment: ["id", "request_id", "comment", "user_id", "full_name", "email_id",
      // "created", "last_modified"]
    };
  }

  resetStates = () => {
    this.setState({
      msg: ""
    });
  };

  alrt = () => {
    if (this.state.msg !== "") {
      let m = <Alert color="info">{this.state.msg}</Alert>;
      return m;
    } else {
      return null;
    }
  };
  handleOnChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const { addComment } = this.state;
    addComment[name] = value;
    this.setState({ addComment });
  };
  onChangeEdit = e => {
    e.preventDefault();
    // console.log(e.target.value);
    const { name, value } = e.target;
    const { modalData } = this.state;
    modalData[name] = value;
    this.setState({ modalData });
  };
  handleKeyDown(e) {
    const heightLimit = 130;
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight + 10}px`;
    // In case you have a limitation
    e.target.style.height = `${Math.min(e.target.scrollHeight, heightLimit)}px`;
  }
  resetForm() {
    document.getElementById("formId").reset();
    // document.getElementById("formEditId").reset();
  }
  toggleEditRequestModal() {
    this.setState(prevState => ({
      editRequestModalDisplay: !prevState.editRequestModalDisplay
    }));
    this.resetStates();
  }
  toggleDeleteRequestModal() {
    this.setState(prevState => ({
      deleteRequestModalDisplay: !prevState.deleteRequestModalDisplay
    }));
    this.resetStates();
  }
  toggleEditCommentModal(row) {
    // this.setState(prevState => ({
    //   editCommentModalDisplay: !prevState.editCommentModalDisplay
    // }));

    const inputid = "input" + row.id;
    const divid = "div" + row.id;
    const divactionid = "divAction" + row.id;
    let divs = document.getElementById(divid);
    let inputs = document.getElementById(inputid);
    let divactions = document.getElementById(divactionid);
    // console.log("divs.style.display");
    // console.log(divs.style.display);
    // console.log(inputs.style.display);
    // console.log(divactions.style.display);
    if (divs.style.display === "block") {
      divs.style.display = "none";
    } else {
      divs.style.display = "block";
    }
    if (inputs.style.display === "block") {
      inputs.style.display = "none";
    } else {
      inputs.style.display = "block";
    }
    if (divactions.style.display === "block") {
      divactions.style.display = "none";
    } else {
      divactions.style.display = "block";
    }
    // console.log("divs.style.display");
    // console.log(divs.style.display);
    // console.log(inputs.style.display);
    // console.log(divactions.style.display);
    this.resetStates();
  }
  toggleDeleteCommentModal() {
    this.setState(prevState => ({
      deleteCommentModalDisplay: !prevState.deleteCommentModalDisplay
    }));
    this.resetStates();
  }

  setEditRequestModalData(
    id,
    title,
    description,
    requestStatus,
    sportType,
    address,
    date,
    time,
    matchId
  ) {
    this.setState({
      modalData: {
        id,
        title,
        description,
        requestStatus,
        sportType,
        address,
        date,
        time,
        matchId
      },
      modalDataOriginal: {
        id,
        title,
        description,
        requestStatus,
        sportType,
        address,
        date,
        time,
        matchId
      }
    });
    this.toggleEditRequestModal();
  }

  setDeleteRequestModalData(
    id,
    title,
    description,
    requestStatus,
    sportType,
    address,
    date,
    time,
    matchId
  ) {
    this.setState({
      modalData: {
        id,
        title,
        description,
        requestStatus,
        sportType,
        address,
        date,
        time,
        matchId
      }
    });
    this.toggleDeleteRequestModal();
  }
  editRequestModal() {
    return (
      <Modal
        isOpen={this.state.editRequestModalDisplay}
        toggle={this.toggleEditRequestModal.bind(this)}
      >
        <ModalHeader toggle={this.toggleEditRequestModal.bind(this)}>
          Edit Request
        </ModalHeader>
        <ModalBody>
          <Form id="formEditId">
            <FormGroup className="formRequired">
              <Label className="labelRequired" for="titleId">
                Title
              </Label>
              <Input
                type="text"
                name="title"
                id="titleId"
                list="requesttemplate"
                value={this.state.modalData.title}
                onChange={this.onChangeEdit}
              />
              <datalist id="requesttemplate">
                {this.state.requestTemplateList.map(t => (
                  <option key={t.id} value={t.request_template}>
                    {t.request_template}
                  </option>
                ))}
              </datalist>
              <p className="validationMsg">{this.state.titleErrMsg}</p>
            </FormGroup>
            <FormGroup>
              <Label for="descriptionId">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="descriptionId"
                value={this.state.modalData.description}
                onChange={this.onChangeEdit}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="requestStatusId">Status</Label>
              <Input
                type="select"
                name="requestStatus"
                id="requestStatusId"
                value={this.state.modalData.requestStatus}
                onChange={this.onChangeEdit}
              >
                <option key="0">--Select--</option>
                {this.state.requestStatusList.map(s => (
                  <option key={s.id} value={s.request_status}>
                    {s.request_status}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="sporttypedid">Sport</Label>
              <Input
                type="text"
                name="sportType"
                id="sporttypedid"
                list="sporttype"
                value={this.state.modalData.sportType}
                onChange={this.onChangeEdit}
              />
              <datalist id="sporttype">
                {this.state.sportTypeList.map(s => (
                  <option key={s.id} value={s.sport_type}>
                    {/* {s.sport_type} */}
                  </option>
                ))}
              </datalist>
            </FormGroup>
            <FormGroup>
              <Label for="addressid">Address</Label>
              <p className="hintPara">
                (Hint: e.g. deer valley community park)
              </p>
              <Input
                type="text"
                name="address"
                id="addressid"
                value={this.state.modalData.address}
                onChange={this.onChangeEdit}
              />
            </FormGroup>
            <FormGroup>
              <Label for="dateId">Date</Label>
              <Input
                type="date"
                name="date"
                id="dateId"
                value={this.state.modalData.date}
                onChange={this.onChangeEdit}
              />
              {/* <p className="validationMsg">{this.state.dateErrMsg}</p> */}
            </FormGroup>
            <FormGroup>
              <Label for="timeId">Time</Label>
              <p className="hintPara">
                (Hint: e.g. 6pm/6-7pm/around 6-6:30pm/etc.)
              </p>
              <Input
                // type="time"
                type="text"
                name="time"
                id="timeId"
                value={this.state.modalData.time}
                onChange={this.onChangeEdit}
              />
            </FormGroup>
            <FormGroup>
              <Label for="matchid">
                Match reference{" "}
                {/* <p>
              <i> (optional)</i>
            </p> */}
              </Label>
              <p className="hintPara">
                (Hint: e.g. refer a match for which you need umpire - if you
                have one)
              </p>
              <Input
                type="select"
                name="matchId"
                id="matchid"
                value={this.state.modalData.matchId}
                onChange={this.onChangeEdit}
              >
                <option key="0">--Select--</option>
                {this.state.matchList.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.id}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.update.bind(this)}>
            Save
          </Button>{" "}
          {/* <Button
            type="reset"
            color="secondary"
            // onClick={this.resetForm.bind(this)}
          >
            Reset
          </Button> */}
          <Button
            color="secondary"
            onClick={this.toggleEditRequestModal.bind(this)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  deleteRequestModal() {
    return (
      <Modal
        isOpen={this.state.deleteRequestModalDisplay}
        toggle={this.toggleDeleteRequestModal.bind(this)}
      >
        <ModalHeader toggle={this.toggleDeleteRequestModal.bind(this)}>
          Delete
        </ModalHeader>
        <ModalBody>
          <h6 className="colorRed">
            Do you want to delete this request? It cannot be recovered after
            deletion
          </h6>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Id: </span>
            <span className="modalParaDataSpan">{this.state.modalData.id}</span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Title: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.title}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Description: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.description}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Sport: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.sportType}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Address: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.address}
            </span>
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
            <span className="modalParaHeadSpan">Reference Match: </span>
            <span className="modalParaDataSpan">
              {this.state.modalData.matchId}
            </span>
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="warning"
            // onClick={this.toggleDeleteRequestModal.bind(this)}
            onClick={this.delete.bind(this)}
          >
            Confirm Delete
          </Button>{" "}
          <Button
            color="secondary"
            onClick={this.toggleDeleteRequestModal.bind(this)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }

  // addCommentFunc = (requestid, userid) => {
  addCommentFunc(requestid) {
    const { addComment } = this.state;
    if (addComment.comment.length > 0) {
      addComment.requestId = requestid;
      addComment.userId = this.state.user[0].id;

      const d = new Date();
      let date = d.toUTCString();
      addComment.created = date;
      addComment.lastModified = date;
      this.setState({ addComment });

      // add the comment to comments
      // const { addToCommentList } = this.state;
      // let { comments } = this.state;

      // addToCommentList.id =
      //   this.state.comments[this.state.comments.length - 1].id + 1;
      // addToCommentList.request_id = requestid;
      // addToCommentList.comment = addComment.comment;
      // addToCommentList.user_id = this.state.user[0].id;
      // addToCommentList.full_name = this.state.user[0].full_name;
      // addToCommentList.email_id = this.state.user[0].email_id;
      // addToCommentList.created = date;
      // addToCommentList.last_modified = date;

      // comments.push(addToCommentList);

      // this.setState({ addToCommentList, comments });

      axios
        .post(process.env.REACT_APP_ADD_NEW_COMMENT, this.state.addComment)
        .then(res => {
          this.setState({
            msg:
              res.status === 200
                ? this.state.addCommentMsg
                : "status code " + res.status + "\n" + this.state.errMsg
          });
          axios.get(process.env.REACT_APP_REQUEST_COMMENT_LIST).then(res => {
            this.setState({
              commentList: res.data,
              comments: res.data.filter(
                c => c.request_id === this.state.requestData[0].id
              )
            });
          });
          this.resetForm();
        })
        .catch(error => {
          this.setState({
            msg: this.state.errMsg + error
          });
        });
    }
  }

  update() {
    let { editRequestData } = this.state;
    const { modalData } = this.state;
    const { modalDataOriginal } = this.state;
    let { editRequestDataToUpdate } = this.state;
    const { requestData } = this.state;
    let tempArr = [];
    // compare modalData and modalOriginalData to verufy if there was any change
    if (JSON.stringify(modalData) === JSON.stringify(modalDataOriginal)) {
      console.log("same");
    } else {
      // fillup editRequestData fields
      editRequestData.id = modalData.id;
      editRequestData.title = modalData.title;
      editRequestData.description = modalData.description;
      editRequestData.sportType = modalData.sportType;
      editRequestData.address = modalData.address;
      editRequestData.date = modalData.date;
      editRequestData.time = modalData.time;

      const reqTemp = this.state.requestTemplateList.filter(
        f => f.request_template === modalData.title
      );
      if (reqTemp.length > 0) {
        editRequestData.requestTemplateId = reqTemp[0].id;
      }
      editRequestData.requestTemplateId = Number(
        editRequestData.requestTemplateId
      );
      editRequestData.requestorId = this.state.user[0].id;
      editRequestData.requestorId = Number(editRequestData.requestorId);
      // editRequestData.requestStatusId = 1; // active
      editRequestData.requestStatusId = this.state.requestStatusList.filter(
        s => s.requestStatusId === modalData.requestStatusId
      )[0].id;
      if (modalData.matchId === "--Select--") {
        editRequestData.matchId = null;
      } else {
        editRequestData.matchId = modalData.matchId;
      }

      const d = new Date();
      let date = d.toUTCString();
      editRequestData.lastModified = date;
      this.setState({ editRequestData });
      axios
        .put(process.env.REACT_APP_UPDATE_REQUEST, this.state.editRequestData)
        .then(res => {
          this.setState({
            msg:
              res.status === 200
                ? this.state.updateRequestMsg
                : "status code " + res.status + "\n" + this.state.errRequestMsg
          });
          // edit the existing request
          editRequestDataToUpdate.title = modalData.title;
          editRequestDataToUpdate.description = modalData.description;
          editRequestDataToUpdate.sport_type = modalData.sportType;
          editRequestDataToUpdate.address = modalData.address;
          editRequestDataToUpdate.request_status = modalData.request_status;
          editRequestDataToUpdate.date = modalData.date;
          editRequestDataToUpdate.time = modalData.time;
          editRequestDataToUpdate.match_id = modalData.matchId;

          editRequestDataToUpdate.id = requestData[0].id;
          editRequestDataToUpdate.requestor = requestData[0].requestor;
          editRequestDataToUpdate.email_id = requestData[0].email_id;
          editRequestDataToUpdate.phone_no = requestData[0].phone_no;
          editRequestDataToUpdate.created = requestData[0].created;

          if (reqTemp.length > 0) {
            editRequestDataToUpdate.request_template = modalData.title;
          }
          editRequestDataToUpdate.lastModified = date;

          tempArr.push(editRequestDataToUpdate);
          this.setState({ requestData: tempArr });

          // let index = this.state.requestData.findIndex(
          //   element => element.id === editRequestDataToUpdate.id
          // );
          // this.state.requestData.splice(index, 1, editRequestDataToUpdate);

          // return this.props.history.push({
          //   pathname: "/myRequest",
          //   state: {
          //     userEmail: this.state.userEmail,
          //     msg: "request submitted successfully"
          //   }
          // });
        })
        .catch(error => {
          this.setState({
            msg: this.state.errMsg + error
          });
        });
    }
    this.toggleEditRequestModal();
  }
  delete() {
    axios
      .delete(
        process.env.REACT_APP_DELETE_REQUEST,
        { data: this.state.modalData.id },
        {
          headers: {
            "Content-Type": "text/plain"
          }
        }
      )
      .then(res => {
        this.setState({
          msg:
            res.status === 200
              ? this.state.deleteRequestMsg
              : "status code " + res.status + "\n" + this.state.errMsg
        });
        console.log("before return");
        return this.props.history.push({
          pathname: "/allRequest",
          state: { userEmail: this.state.userEmail }
        });
        // this.toggleDeleteRequestModal();
      })
      .catch(error => {
        this.setState({
          msg: this.state.errMsg + error
        });
        this.toggleDeleteRequestModal();
      });
  }

  // update comment
  updateComment() {
    const d = new Date();
    let date = d.toUTCString();
    let { modalDataComment } = this.state;
    modalDataComment.last_modified = date;
    this.setState({ modalDataComment });
    console.log(this.state.modalDataComment);
    axios
      .put(process.env.REACT_APP_UPDATE_COMMENT, this.state.modalDataComment)
      .then(res => {
        this.setState({
          msg:
            res.status === 200
              ? this.state.updateCommentMsg
              : "status code " + res.status + "\n" + this.state.errRequestMsg
        });
        // toggle commnet edit box
        this.toggleEditCommentModal(modalDataComment);
        // update comments list
        const { comments } = this.state;
        // const index = comments.findIndex(e => e.id === modalDataComment.id)
        // comments.splice(index, 1, modalDataComment)
        comments[
          comments.findIndex(e => e.id === modalDataComment.id)
        ] = modalDataComment;
        this.setState({ comments });
      })
      .catch(error => {
        this.setState({
          msg: this.state.errMsg + error
        });
      });
  }
  // cancel update comment
  cancelEditComment(row) {
    // const inputid = "input" + row.id;
    const divid = "div" + row.id;
    // console.log("row.comment");
    // console.log(this.state.originalComment);
    // console.log(this.state.modalDataComment.comment);
    // console.log(document.getElementById(divid).innerHTML);

    document.getElementById(divid).innerHTML = this.state.originalComment;
    // const divactionid = "divAction" + row.id;
    // document.getElementById(divid).style.display = "block";
    // document.getElementById(inputid).style.display = "none";
    // document.getElementById(divactionid).style.display = "none";

    this.toggleEditCommentModal(row);
  }
  // set modal data for edit comment
  setEditCommentModalData(row) {
    this.setState({
      modalDataComment: row,
      originalComment: row.comment
    });
    const inputid = "input" + row.id;
    const divid = "div" + row.id;
    const divactionid = "divAction" + row.id;

    document.getElementById(divid).style.display = "none";
    document.getElementById(divactionid).style.display = "block";
    document.getElementById(inputid).style.display = "block";
    // this.toggleEditCommentModal(row);

    // if (document.getElementById(divid).contentEditable === "true") {
    //   document.getElementById(divid).contentEditable = "false";
    //   // document.getElementById("editCmntBtnId").innerHTML = "Save";
    // } else {
    //   document.getElementById(divid).contentEditable = "true";
    // }
    // this.toggleEditCommentModal();
  }
  // set modal data for delete comment
  setDeleteCommentModalData(row) {
    this.setState({
      modalDataComment: row
    });
    this.toggleDeleteCommentModal();
  }
  // delete comment modal
  deleteCommentModal() {
    return (
      <Modal
        isOpen={this.state.deleteCommentModalDisplay}
        toggle={this.toggleDeleteCommentModal.bind(this)}
      >
        <ModalHeader toggle={this.toggleDeleteCommentModal.bind(this)}>
          Delete Comment
        </ModalHeader>
        <ModalBody>
          <h6 className="colorRed">
            Do you want to delete this comment? It cannot be recovered after
            deletion
          </h6>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Id: </span>
            <span className="modalParaDataSpan">
              {this.state.modalDataComment.id}
            </span>
          </p>
          <p className="modalPara">
            <span className="modalParaHeadSpan">Comment: </span>
            <span className="modalParaDataSpan">
              {this.state.modalDataComment.comment}
            </span>
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="warning"
            // onClick={this.toggleDeleteRequestModal.bind(this)}
            onClick={this.deleteCommentFunc.bind(this)}
          >
            Confirm Delete
          </Button>{" "}
          <Button
            color="secondary"
            onClick={this.toggleDeleteCommentModal.bind(this)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
  // delete comment function
  deleteCommentFunc() {
    axios
      .delete(
        process.env.REACT_APP_DELETE_COMMENT,
        { data: this.state.modalDataComment.id },
        {
          headers: {
            "Content-Type": "text/plain"
          }
        }
      )
      .then(res => {
        this.setState({
          msg:
            res.status === 200
              ? this.state.deleteCommentMsg
              : "status code " + res.status + "\n" + this.state.errMsg
        });
        // // delete comment from comments list
        // let { comments } = this.state;
        // const index = comments.findIndex(
        //   i => i.id === this.state.modalDataComment.id
        // );
        // if (index > -1) {
        //   comments.splice(index, 1);
        // }
        axios.get(process.env.REACT_APP_REQUEST_COMMENT_LIST).then(res => {
          this.setState({
            commentList: res.data,
            comments: res.data.filter(
              c => c.request_id === this.state.requestData[0].id
            )
          });
        });
        this.toggleDeleteCommentModal();
      })
      .catch(error => {
        this.setState({
          msg: this.state.errMsg + error
        });
        this.toggleDeleteRequestModal();
      });
  }

  dateConvert(timestamp) {
    // format YYYY-MM-DD HH:MM:SS AM/PM
    const date = new Date(timestamp);
    const today = new Date();
    if (today.toDateString() === date.toDateString()) {
      return (
        date.toLocaleTimeString().slice(0, 4) +
        " " +
        date.toLocaleTimeString().split(" ")[1]
      );
    } else {
      return (
        date.toDateString().split(" ")[1] +
        " " +
        date.toDateString().split(" ")[2]
      );
    }
  }

  displayRequest(data) {
    return (
      <div key={data.id} className="disp-div">
        <div className="displayFlex">
          {/* <div>
            <div id="disp-div-photo"></div>
            <br />
            <NavLink
              to={{
                pathname: `/player/${data.email_id}`,
                state: {
                  userEmail: this.state.userEmail
                }
              }}
            >
              {data.requestor}
            </NavLink>
          </div> */}
          <div className="disp-div-requestor">
            <div>
              <img
                src={
                  this.state.userImageDataList.filter(
                    u => u.email_id === data.email_id
                  ).length > 0
                    ? this.state.userImageDataList.filter(
                        u => u.email_id === data.email_id
                      )[0].image_data
                    : process.env.REACT_APP_DEFAULT_IMAGE
                }
                className="disp-div-photo"
                alt={
                  this.state.userImageDataList.filter(
                    u => u.email_id === data.email_id
                  ).length > 0
                    ? this.state.userImageDataList.filter(
                        u => u.email_id === data.email_id
                      )[0].image_data
                    : process.env.REACT_APP_DEFAULT_IMAGE
                }
              />
            </div>
            <NavLink
              className="fontSmall"
              to={{
                pathname: `/player/${data.email_id}`,
                state: {
                  userEmail: this.state.userEmail
                }
              }}
            >
              {data.requestor}
            </NavLink>
          </div>
          <div className="nav-link">
            <Row className="disp-div-row">
              <Col xs="9" className="disp-div-row-col title">
                {data.title}
              </Col>
              <Col xs="3" className="disp-div-row-col textAlignRight">
                {this.dateConvert(data.created)}
              </Col>
            </Row>
            <Row className="disp-div-row">
              <Col xs="9" className="disp-div-row-col sportType">
                {data.sport_type ? data.sport_type : "No sport selected"}
              </Col>
              <Col xs="3" className="disp-div-row-col">
                <i>Status:</i>{" "}
                {data.request_status ? data.request_status : "N/A"}
              </Col>
            </Row>
            <Row className="disp-div-row">
              <Col xs="6" className="disp-div-row-col">
                <i>Venue:</i> {data.address ? data.address : "N/A"}
              </Col>
              <Col xs="3" className="disp-div-row-col">
                <i>Date:</i> {data.date ? data.date : "N/A"}
              </Col>
              <Col xs="3" className="disp-div-row-col">
                <i>Time:</i> {data.time ? data.time : "N/A"}
              </Col>
            </Row>
            <Row className="disp-div-row">
              <Col className="disp-div-row-col">
                <i>Description:</i>{" "}
                {data.description ? data.description : "N/A"}
              </Col>
            </Row>
            {this.state.showEditRequest ? (
              <Row className="disp-div-row">
                <Col className="disp-div-row-col">
                  <button
                    className="transparentButton"
                    onClick={this.setEditRequestModalData.bind(
                      this,
                      data.id,
                      data.title,
                      data.description,
                      data.request_status,
                      data.sport_type,
                      data.address,
                      data.date,
                      data.time,
                      data.match_id
                    )}
                  >
                    Edit
                  </button>{" "}
                  <button
                    className="transparentButton"
                    onClick={this.setDeleteRequestModalData.bind(
                      this,
                      data.id,
                      data.title,
                      data.description,
                      data.request_status,
                      data.sport_type,
                      data.address,
                      data.date,
                      data.time,
                      data.match_id
                    )}
                  >
                    Delete
                  </button>
                </Col>
              </Row>
            ) : null}
          </div>
        </div>
        <Row className="disp-div-row">
          <Col className="disp-div-row-col">
            <Form id="formId">
              <FormGroup>
                <Label for="commentId">Comment</Label>
                <div className="dispFlex comments">
                  <Input
                    type="textarea"
                    name="comment"
                    id="commentId"
                    placeholder="Comment"
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleOnChange}
                  />
                  <Button
                    // type="submit"
                    color="primary"
                    size="sm"
                    // onClick={this.addCommentFunc(data.id, this.state.user[0].id)}
                    onClick={this.addCommentFunc.bind(this, data.id)}
                  >
                    Save
                  </Button>
                  <Button
                    type="reset"
                    color="secondary"
                    size="sm"
                    // onClick={this.resetForm.bind(this)}
                  >
                    Reset
                  </Button>
                </div>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }

  displayComment(data) {
    return data.map(row => {
      // const href = "/player/" + row.email_id;
      const inputId = "input" + row.id;
      const divId = "div" + row.id;
      const divActionId = "divAction" + row.id;
      // console.log("this.state.userEmail");
      // console.log(this.state.userEmail);
      // console.log(row.email_id);
      return (
        // <div key={row.id} className="reqDetTbl commentTbody tbody">
        <div key={row.id}>
          <div className="disp-comment">
            <div className="disp-div-comment">
              <div className="displayFlex">
                <div className="commentRequestor">
                  {/* <NavLink to={{ pathname: `/player/${row.email_id}` }}> */}
                  {/* <a className="tdLink colorBlue" href={href}>
                    {row.full_name}
                  </a> */}
                  <NavLink
                    className="fontSmall"
                    to={{
                      pathname: `/player/${row.email_id}`,
                      state: {
                        userEmail: this.state.userEmail
                      }
                    }}
                  >
                    {row.full_name}
                  </NavLink>
                </div>
                <div className="commentDate">
                  {this.dateConvert(row.created)}
                </div>
              </div>
              <input
                type="text"
                id={inputId}
                className="displayNone editCommentInput"
                name="editCommentLine"
                value={row.comment}
                onChange={e => {
                  let { modalDataComment } = this.state;
                  modalDataComment.comment = e.target.value;
                  this.setState({ modalDataComment });
                }}
              />
              {/* <div id={divId} className="commentLine"> */}

              <div
                id={divId}
                className="displayBlock"
                onChange={e => {
                  let { modalDataComment } = this.state;
                  modalDataComment.comment = e.target.value;
                  this.setState({ modalDataComment });
                }}
              >
                {row.comment}
              </div>

              <div id={divActionId} className="displayNone">
                <button
                  onClick={this.updateComment.bind(this)}
                  className="transparentButton ml-1 fontSmall"
                >
                  Save
                </button>{" "}
                |
                <button
                  onClick={this.cancelEditComment.bind(this, row)}
                  className="transparentButton ml-1 fontSmall"
                >
                  Cancel
                </button>
              </div>
            </div>
            {this.state.userEmail.toLowerCase() === row.email_id ||
            this.state.showEditComment ? (
              <div className="disp-div-action">
                <button
                  id="editCmntBtnId"
                  onClick={this.setEditCommentModalData.bind(this, row)}
                  className="transparentButton ml-2 fontSmall"
                >
                  Edit
                </button>
                <button
                  onClick={this.setDeleteCommentModalData.bind(this, row)}
                  className="transparentButton ml-2 fontSmall"
                >
                  Delete
                </button>
              </div>
            ) : null}
          </div>
        </div>
      );
    });
  }
  componentDidMount() {
    if (
      this.state.userEmail.toLowerCase() ===
      this.state.requestData[0].email_id.toLowerCase()
    ) {
      this.setState({
        showEditRequest: true
      });
    }
    if (this.state.userEmail.toLowerCase() === process.env.REACT_APP_ADMIN) {
      this.setState({
        showEditRequest: true,
        showEditComment: true
      });
    }
    axios.get(process.env.REACT_APP_REQUEST_COMMENT_LIST).then(res => {
      this.setState({
        commentList: res.data,
        comments: res.data.filter(
          c => c.request_id === this.state.requestData[0].id
        )
      });
    });
    axios.get(process.env.REACT_APP_REQUEST_TEMPLATE_LIST).then(res => {
      this.setState({
        requestTemplateList: res.data
      });
      // this.state.teamList.splice(0, 0, "--Select--");
    });
    axios.get(process.env.REACT_APP_SPORT_TYPE_LIST).then(res => {
      this.setState({
        sportTypeList: res.data
      });
    });
    axios.get(process.env.REACT_APP_REQUEST_STATUS_LIST).then(res => {
      this.setState({
        requestStatusList: res.data
      });
    });
    // axios
    //   .get(process.env.REACT_APP_GET_PLAYER, {
    //     params: {
    //       email_id: this.state.userEmail
    //     }
    //   })
    //   .then(res => {
    //     this.setState({
    //       user: res.data
    //     });
    //     console.log("user fetched from database is ", res.data);
    //   });
    axios
      .get(process.env.REACT_APP_ALL_MATCHES, {
        withCredentials: true
      })
      .then(res => {
        this.setState({
          matchList: res.data
        });
      });

    axios.get(process.env.REACT_APP_GET_IMAGE_S3).then(res => {
      this.setState({
        userImageDataList: res.data
      });
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          {this.editRequestModal()}
          {this.deleteRequestModal()}
          {this.deleteCommentModal()}
          <h1 className="pageHead">{this.state.header}</h1>
          <this.alrt />
          {this.displayRequest(this.state.requestData[0])}
          <div className="disp-div">
            <p>Comments:</p>
            {this.displayComment(this.state.comments)}
          </div>
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default withRouter(RequestDetailsTblClass);
