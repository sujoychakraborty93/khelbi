import React, { Component } from "react";
// import tblHeaderClass from "./createTableHeader";
// import NavbarDispClass from "../navbarTop";
// import NavbarFooterClass from "../navbarFooter";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Form, FormGroup, Input, Label } from "reactstrap";

class RequestSubmitTblClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: this.props.userEmail,
      header: "Submit Requests",
      msg: "",
      addRequest: {
        title: "",
        requestTemplateId: null,
        description: "",
        requestorId: null,
        requestStatusId: null,
        sportType: "",
        address: "",
        venueId: "",
        date: "",
        time: "",
        matchId: null,
        created: "",
        lastModified: ""
      },
      requestDetails: [],
      myRequestDetails: [],
      requestTemplateList: [],
      sportTypeList: [],
      requestCommentList: [],
      requestStatusList: [],
      user: [],
      cityList: [],
      zipList: [],
      countryStateList: [],
      countryList: [],
      matchList: [],
      titleErrMsg: "",
      addMsg: "Added successfully",
      errMsg: `Sorry we encountered an error. Please report below details to the admin using 
      Contact Us link at bottom of the page`
    };
  }

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
    console.log(e.target.value);
    const { name, value } = e.target;
    const { addRequest } = this.state;
    addRequest[name] = value;
    this.setState({ addRequest });
  };

  addRequest() {
    console.log("user is in addrequest ", this.state.user);
    let { addRequest } = this.state;
    // fillup addRequest fields
    const reqTemp = this.state.requestTemplateList.filter(
      f => f.request_template === addRequest.title
    );
    if (reqTemp.length > 0) {
      addRequest.requestTemplateId = reqTemp[0].id;
    }
    addRequest.requestTemplateId = Number(addRequest.requestTemplateId);
    addRequest.requestorId = this.state.user[0].id;
    addRequest.requestorId = Number(addRequest.requestorId);
    addRequest.requestStatusId = 1; // active
    if (addRequest.matchId === "--Select--") {
      addRequest.matchId = null;
    }
    const d = new Date();
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
    addRequest.created = date;
    addRequest.lastModified = date;
    this.setState({ addRequest });
    axios
      .post(process.env.REACT_APP_ADD_NEW_REQUEST, this.state.addRequest)
      .then(res => {
        this.setState({
          msg:
            res.status === 200
              ? this.state.addMsg
              : "status code " + res.status + "\n" + this.state.errMsg
        });
        // axios.get(this.state.matchesLink).then(res => {
        //   this.setState({
        //     matchDetails: res.data
        //   });
        // });
        return this.props.history.push({
          pathname: "/myRequest",
          state: {
            userEmail: this.state.userEmail,
            msg: "request submitted successfully"
          }
        });
      })
      .catch(error => {
        this.setState({
          msg: this.state.errMsg + error
        });
      });
  }

  resetForm() {
    document.getElementById("formId").reset();
  }

  validate = data => {
    let titleErrMsg = "";

    if (!data.title || data.title === "") {
      titleErrMsg = "please provide a title";
    }

    if (titleErrMsg) {
      this.setState({ titleErrMsg });
      return false;
    }
    return true;
  };

  submitForm() {
    return (
      <Form id="formId">
        <FormGroup className="formRequired">
          {/* <div className="inLine"> */}
          <Label className="labelRequired" for="titleId">
            Title
          </Label>
          {/* <p className="hintPara">
            (Hint: if not decided, select any date now and change it later)
          </p> */}
          {/* </div> */}
          <Input
            type="text"
            name="title"
            id="titleId"
            // placeholder="title"
            // value={this.state.addDetails.date}
            list="requesttemplate"
            onChange={this.handleOnChange}
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
            placeholder="Description"
            onChange={this.handleOnChange}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label for="sporttypedid">Sport</Label>
          <Input
            type="text"
            name="sportType"
            id="sporttypedid"
            placeholder="sport type"
            list="sporttype"
            onChange={this.handleOnChange}
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
          <p className="hintPara">(Hint: e.g. deer valley community park)</p>
          <Input
            type="text"
            name="address"
            id="addressid"
            placeholder="Address"
            onChange={this.handleOnChange}
          />
        </FormGroup>
        {/* <FormGroup>
          <Label for="venueid">Venue</Label>
          <p className="hintPara">
            (Hint: can be same or different than address. e.g. cholla park)
          </p>
          <Input
            type="text"
            name="venueId"
            id="venueid"
            placeholder="venue"
            list="venuelist"
            onChange={this.handleOnChange}
          />
          <datalist id="venuelist">
            {this.state.venueList.map(v => (
              <option key={v.id} value={v.venue_name}>
              </option>
            ))}
          </datalist>
        </FormGroup> */}
        <FormGroup>
          <Label for="dateId">Date</Label>
          <Input
            type="date"
            name="date"
            id="dateId"
            placeholder="date placeholder"
            onChange={this.handleOnChange}
          />
          <p className="validationMsg">{this.state.dateErrMsg}</p>
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
            placeholder="time placeholder"
            onChange={this.handleOnChange}
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
            (Hint: e.g. refer a match for which you need umpire - if you have
            one)
          </p>
          <Input
            type="select"
            name="matchId"
            id="matchid"
            onChange={this.handleOnChange}
          >
            <option key="0">--Select--</option>
            {this.state.matchList.map(m => (
              <option key={m.id} value={m.id}>
                {m.id}
              </option>
            ))}
          </Input>
        </FormGroup>
        <Button color="primary" onClick={this.addRequest.bind(this)}>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={this.resetForm.bind(this)}>
          Reset
        </Button>
      </Form>
    );
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  componentDidMount() {
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

    // axios.get("http://localhost:4000/getteamlist").then(res => {
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
    axios.get(process.env.REACT_APP_REQUEST_COMMENT_LIST).then(res => {
      this.setState({
        requestCommentList: res.data
      });
    });
    axios.get(process.env.REACT_APP_REQUEST_STATUS_LIST).then(res => {
      this.setState({
        requestStatusList: res.data
      });
    });
    console.log("useremail is in component did update ", this.state.userEmail);
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
        console.log("user fetched from database is ", res.data);
      });

    axios
      .get(process.env.REACT_APP_ALL_MATCHES, {
        withCredentials: true
      })
      .then(res => {
        this.setState({
          matchList: res.data
        });
      });
  }

  //   hi = <h1>hi</h1>;

  render() {
    // this.tbl = new tblHeaderClass();
    return (
      //   <div id="pageTop">
      //     <NavbarDispClass userEmail={this.state.userEmail} />
      <div className="container">
        <h1 className="pageHead">{this.state.header}</h1>
        <this.alrt />
        {this.submitForm()}
      </div>
    );
  }
}

export default withRouter(RequestSubmitTblClass);
