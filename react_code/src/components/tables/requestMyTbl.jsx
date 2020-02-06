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
  Col
} from "reactstrap";
import { NavLink, withRouter } from "react-router-dom";
import GC from "../../images/GC.jpg";

class RequestMyTblClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: this.props.userEmail,
      msg: this.props.msg ? this.props.msg : "",
      header: "My Requests",
      addCommentData: {
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
      requestDetails: [],
      myRequestDetails: [],
      user: [],
      commentList: [],
      userImageData: [],
      addMsg: "comment added!",
      errMsg: "error while adding added!"
    };
  }

  dateConvert(timestamp) {
    // format YYYY-MM-DD HH:MM:SS AM/PM
    // console.log("timestamp");
    // console.log(timestamp);
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

  handleOnChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const { addCommentData } = this.state;
    addCommentData[name] = value;
    this.setState({ addCommentData });
  };

  // add = (requestid, userid) => {
  add(requestid) {
    const { addCommentData } = this.state;
    if (addCommentData.comment.length > 0) {
      addCommentData.requestId = requestid;
      // addCommentData.userId = userid;
      addCommentData.userId = this.state.user[0].id;
      // addCommentData.userId = 2;

      const d = new Date();
      let date = d.toUTCString();
      addCommentData.created = date;
      addCommentData.lastModified = date;

      // add the comment to commentList
      const { addToCommentList } = this.state;
      let { commentList } = this.state;

      addToCommentList.id =
        this.state.commentList[this.state.commentList.length - 1].id + 1;
      addToCommentList.request_id = requestid;
      addToCommentList.comment = addCommentData.comment;
      addToCommentList.user_id = this.state.user[0].id;
      addToCommentList.full_name = this.state.user[0].full_name;
      addToCommentList.email_id = this.state.user[0].email_id;
      addToCommentList.created = date;
      addToCommentList.last_modified = date;

      commentList.push(addToCommentList);

      this.setState({ addCommentData, addToCommentList, commentList });
      axios
        .post(process.env.REACT_APP_ADD_NEW_COMMENT, this.state.addCommentData)
        .then(res => {
          this.setState({
            msg:
              res.status === 200
                ? this.state.addMsg
                : "status code " + res.status + "\n" + this.state.errMsg
          });
          return this.props.history.push({
            pathname: `/request/${requestid}`,
            state: {
              userEmail: this.state.userEmail,
              msg: this.state.addMsg,
              requestData: this.state.requestDetails.filter(
                r => r.id === requestid
              ),
              comment: this.state.commentList.filter(
                c => c.request_id === requestid
              ),
              user: this.state.user
            }
          });
        })
        .catch(error => {
          this.setState({
            msg: this.state.errMsg + error
          });
        });
    }
  }

  // resetForm() {
  //   document.getElementById("formId").reset();
  // }
  handleKeyDown(e) {
    const heightLimit = 130;
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight + 10}px`;
    // In case you have a limitation
    e.target.style.height = `${Math.min(e.target.scrollHeight, heightLimit)}px`;
  }

  requestTbl(data) {
    return data.map((row, i) => {
      let sendData = [];
      sendData.push(row);
      // console.log(this.state.requestDetails.filter(r => r.id === row.id));
      return (
        <div key={row.id} className="disp-div">
          <div className="displayFlex">
            <div>
              <div>
                <img
                  src={
                    this.state.userImageData.length > 0
                      ? this.state.userImageData[0].image_data
                      : // : process.env.REACT_APP_DEFAULT_IMAGE
                        GC
                  }
                  className="disp-div-photo"
                  alt={
                    this.state.userImageData.length > 0
                      ? this.state.userImageData[0].image_data
                      : // : process.env.REACT_APP_DEFAULT_IMAGE
                        GC
                  }
                />
              </div>
              <br />
              <NavLink
                to={{
                  pathname: `/player/${row.email_id}`,
                  state: {
                    userEmail: this.state.userEmail
                  }
                }}
              >
                {row.requestor}
              </NavLink>
            </div>
            <NavLink
              className="nav-link"
              to={{
                pathname: `/request/${row.id}`,
                state: {
                  userEmail: this.state.userEmail,
                  // requestData: data.filter(
                  //   r => r.id === row.id
                  // )
                  requestData: sendData,
                  comment: this.state.commentList.filter(
                    c => c.request_id === row.id
                  ),
                  user: this.state.user
                }
              }}
            >
              <Row className="disp-div-row">
                <Col xs="10" className="disp-div-row-col title">
                  {row.title}
                </Col>
                <Col xs="2" className="disp-div-row-col textAlignRight">
                  {/* {row.created.split(" ")[0]} */}
                  {this.dateConvert(row.created)}
                </Col>
              </Row>
              <Row className="disp-div-row">
                <Col className="disp-div-row-col sportType">
                  {row.sport_type ? row.sport_type : "No sport selected"}
                </Col>
              </Row>
              <Row className="disp-div-row">
                <Col xs="6" className="disp-div-row-col">
                  <i>Venue:</i> {row.address ? row.address : "N/A"}
                </Col>
                <Col xs="3" className="disp-div-row-col">
                  <i>Date:</i> {row.date ? row.date : "N/A"}
                </Col>
                <Col xs="3" className="disp-div-row-col">
                  <i>Time:</i> {row.time ? row.time : "N/A"}
                </Col>
              </Row>
              {/* <Row className="disp-div-row">
              <Col className="disp-div-row-col">
                {row.description ? row.description : "No description added"}
              </Col>
            </Row> */}
            </NavLink>
          </div>
          <Row className="disp-div-row">
            <Col className="disp-div-row-col">
              {/* <Form id="formId" onSubmit={this.add.bind(this, row.id)}> */}
              {/* <Form id="formId"> */}
              <Form>
                <FormGroup>
                  <Label for={"comment" + row.id}>Comment</Label>
                  <div className="dispFlex comments">
                    <Input
                      type="textarea"
                      name="comment"
                      className="commentId"
                      id={"comment" + row.id}
                      placeholder="Comment"
                      onKeyDown={this.handleKeyDown}
                      onChange={this.handleOnChange}
                    />
                    <Button
                      // type="submit"
                      color="primary"
                      size="sm"
                      // onClick={this.add(row.id, this.state.user[0].id)}
                      onClick={this.add.bind(this, row.id)}
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

  componentDidMount() {
    // console.log("inside componentdidmount");
    axios
      .get(
        process.env.REACT_APP_REQUEST_LIST
        // {
        //   params: { email_id: this.state.userId }
        // },
        // { withCredentials: true }
      )
      .then(res => {
        this.setState({
          requestDetails: res.data,
          //   filterMatchDetails: res.data,
          myRequestDetails: res.data
            // .map(el => {
            //   return el.match_type;
            // })
            .filter(req => req.email_id === this.state.userEmail)
        });
      });
    axios
      .get(process.env.REACT_APP_GET_PLAYER, {
        params: {
          email_id: this.state.userEmail
        }
      })
      .then(res => {
        this.setState({
          user: res.data
        });
      });

    axios.get(process.env.REACT_APP_REQUEST_COMMENT_LIST).then(res => {
      this.setState({
        commentList: res.data
      });
    });
    axios
      .get(process.env.REACT_APP_GET_IMAGE_S3, {
        params: {
          email_id: this.state.userEmail
        }
      })
      .then(res => {
        this.setState({
          userImageData: res.data
        });
      });
  }

  render() {
    // console.log("this.state.myRequestDetails");
    // console.log(this.state.requestDetails);
    // console.log(this.state.myRequestDetails);
    return (
      <div>
        <div className="container">
          <h1 className="pageHead">{this.state.header}</h1>
          <this.alrt />
          {this.requestTbl(this.state.myRequestDetails)}
        </div>
      </div>
    );
  }
}

export default withRouter(RequestMyTblClass);
