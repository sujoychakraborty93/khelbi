import React, { Component } from "react";
import tblHeaderClass from "./createTableHeader";
import NavbarDispClass from "../navbarTop";
import NavbarFooterClass from "../navbarFooter";
// import config from "../../config-dev";
// import { Form, FormControl, Button, Image } from "react-bootstrap";
import GC from "../../images/GC.jpg";
// import fs from "fs";
import axios from "axios";
// import ReactDOM from "react-dom";
import { Alert } from "reactstrap";

class PlayerDetailsClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // userId: this.props.userId, // user email id
      playerEmailId: this.props.playerEmailId, // player email id
      userEmail: this.props.userEmail,
      header: this.props.header,
      //   data: [{ head1: "body1", head2: "body2" }],
      player: [],
      teamList: [],
      playerList: [],
      userRoleList: [],
      secretQList: [],
      imageList: [],
      imageSrc: "",
      userAlreadyHasImage_id: null,
      userAlreadyHasImage_userId: null,
      isDefaultImage: 1,
      selectedPhoto: null,
      loaded: 0,
      addPhotoDetails: {
        user_id: null,
        image: null,
        created: "",
        last_modified: ""
      },
      msgPhoto: "",
      imageType: ["image/jpg", "image/jpeg", "image/gif", "image/png"],
      imageSize: 500000,
      showEdit:
        this.props.userEmail.toLowerCase() === "admin@myemail.com"
          ? true
          : false
    };
  }

  //------------------------------------------------------------------------------------------------------
  // this method is called from fileupload() to alert user of the limitations of uploading a image file
  //------------------------------------------------------------------------------------------------------
  photoAlert = () => {
    if (this.state.msgPhoto !== "") {
      let m = <Alert color="danger">{this.state.msgPhoto}</Alert>;
      return m;
    } else {
      return null;
    }
  };

  //------------------------------------------------------------------------------------------------------
  // this is called from fileupload() to set 'imageSrc' value to the latest file uploaded by user
  //------------------------------------------------------------------------------------------------------
  // setImageVariable = imageVar => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(imageVar); // read in base64
  //   // reader.readAsBinaryString(imageVar); // read in binary
  //   reader.onload = e => {
  //     this.setState({
  //       imageSrc: reader.result,
  //       isDefaultImage: 0,
  //       msgPhoto: ""
  //     });
  //   };
  // };
  setImageVariable = () => {
    axios
      .get(process.env.REACT_APP_GET_IMAGE_S3, {
        params: { email_id: this.state.playerEmailId }
      })
      .then(res => {
        if (res.data.length > 0) {
          console.log("res.data");
          console.log(res.data);
          this.setState({
            imageSrc: res.data[0].image_data,
            userAlreadyHasImage_id: res.data[0].id,
            userAlreadyHasImage_userId: res.data[0].user_id,
            isDefaultImage: 0,
            msgPhoto: ""
          });
        }
      });
  };

  //------------------------------------------------------------------------------------------------------
  // this is also called from fileupload() method to update image of an existimg user
  //------------------------------------------------------------------------------------------------------
  updateImageForExistingUser = (data, image) => {
    console.log("in updateImageForExistingUser");
    // append the id of the entry of user_image_data_tb where user already has a image
    data.append("id", this.state.userAlreadyHasImage_id);
    // append the image_data of the entry of user_image_data_tb where user already has a image
    data.append("old_image_data", this.state.imageSrc);
    console.log(data);
    axios.post(process.env.REACT_APP_UPDATE_IMAGE_S3, data).then(res => {
      console.log("res from React code using update");
      console.log(res);
      this.setImageVariable(image);
    });
  };

  //------------------------------------------------------------------------------------------------------
  // this is called from render method to update state variable when value is entered in input field.
  //------------------------------------------------------------------------------------------------------
  fileChangeHandler = e => {
    let { addPhotoDetails } = this.state;
    addPhotoDetails.user_id = this.state.player[0].id;
    let d = new Date();
    let date = d.toUTCString();
    addPhotoDetails.created = date;
    addPhotoDetails.last_modified = date;
    addPhotoDetails.image = e.target.files[0];
    this.setState({ addPhotoDetails });
    // if (!e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
    //   alert("not a file");
    // } else {
    // this.setState({ selectedPhoto: e.target.files[0], loaded: 0 });
    // }
    // console.log(this.state.selectedPhoto);
    // console.log(e.target.files);

    // ==============================  SEND IMAGE AS BINARY DATA TO NODE JS FOR UPLOAD ================
    // const reader = new FileReader();
    // // reader.readAsDataURL(e.target.files[0]); // read in base64
    // reader.readAsBinaryString(e.target.files[0]); // read in binary
    // reader.onload = e => {
    //   // console.log(e.target.result);
    //   const image = new Buffer(e.target.result, "binary").toString("base64"); // convert binary to base64
    //   addPhotoDetails.image = image;
    //   console.log(addPhotoDetails.user_id);
    //   console.log(addPhotoDetails.created);
    //   this.setState({ addPhotoDetails });
    // };
  };

  //------------------------------------------------------------------------------------------------------
  // this method uplaods file - add to database if the user does not have any existing image. Or
  // replaces existng image of a user if he/she uplaods a new image
  //------------------------------------------------------------------------------------------------------
  fileUpload = e => {
    // add image as base64 data into node js and then database
    // axios
    //   .post(process.env.REACT_APP_ADD_NEW_IMAGE, this.state.addPhotoDetails)
    //   .then(res => {
    //     this.setState({
    //       msg:
    //         res.status === 200
    //           ? this.state.addMsg
    //           : "status code " + res.status + "\n" + this.state.errMsg
    //     });
    //     axios
    //       .get(process.env.REACT_APP_GET_IMAGE, {
    //         params: { email_id: this.state.playerEmailId }
    //       })
    //       .then(res => {
    //         if (res.data.length > 0) {
    //           this.setState({
    //             imageSrc: res.data[0].image
    //           });
    //         }
    //       });
    //   })
    //   .catch(error => {
    //     this.setState({
    //       msg: this.state.errMsg + error
    //     });
    //   });
    const { addPhotoDetails } = this.state;
    console.log("addPhotoDetails.image.type");
    console.log(addPhotoDetails.image.type);
    // check if file is a image
    // if (!addPhotoDetails.image.name.match(/.(jpg|jpeg|png|gif)$/i)) {
    if (
      this.state.imageType.every(type => addPhotoDetails.image.type !== type)
    ) {
      this.setState({
        msgPhoto: "this is not a image (jpg|jpeg|png|gif) file"
      });
    } else {
      if (addPhotoDetails.image.size > this.state.imageSize) {
        this.setState({
          msgPhoto: "max size limit 500kb. please upload a smaller file"
        });
      } else {
        const data = new FormData();
        // data.append("file", this.state.selectedPhoto);
        data.append("file", addPhotoDetails.image);
        data.append("user_id", addPhotoDetails.user_id);
        data.append("created", addPhotoDetails.created);
        data.append("last_modified", addPhotoDetails.last_modified);

        // send file to server
        // if the player has default image, add the new image in database
        // else replace the existing image
        this.state.isDefaultImage
          ? axios
              .post(process.env.REACT_APP_ADD_NEW_IMAGE_S3, data)
              .then(res => {
                // then print response status
                // check if the data is binary
                // console.log("res");
                // console.log(res); // response from node js after image file is uploaded in s3 and that image file data is uploaded in database
                // console.log(this.state.imageSrc); // imageSrc is a direct path of image file stored in a website
                // console.log(GC); // GC is a image .png file imported from a server/local folder
                // console.log(addPhotoDetails.image); // this is derived as e.target.file[0] from input field as uploaded file

                // this.setState({
                //   imageSrc: res.data.path,
                //   msgPhoto: ""
                // });

                this.setImageVariable(addPhotoDetails.image);
                // const reader = new FileReader();
                // reader.readAsDataURL(addPhotoDetails.image); // read in base64
                // // reader.readAsBinaryString(addPhotoDetails.image); // read in binary
                // reader.onload = e => {
                //   this.setState({
                //     imageSrc: reader.result,
                //     msgPhoto: ""
                //   });
                // };
              })
          : this.updateImageForExistingUser(data, addPhotoDetails.image);
      }
    }
  };

  verticalTable(player) {
    let keys = Object.keys(player[0]);
    return keys.map(key => {
      return (
        <tr key={key}>
          <th>{key}</th>
          <td>{player[0][key]}</td>
        </tr>
      );
    });
  }

  showImage = imgSrc => {
    if (imgSrc !== "") {
      return (
        // image sourced from database as binary data
        // <img
        //   src={`data:image/jpg;base64,${imgSrc}`} // convert imgSrc from base64 to binary
        //   alt="CRICEXTRA"
        //   className="playerImage"
        // />
        // image sourced from multer diskstorage as file
        <img src={imgSrc} alt="CRICEXTRA" className="playerImage" />
      );
    } else {
      return (
        <img
          // src={process.env.REACT_APP_DEFAULT_IMAGE}
          src={GC}
          alt="CRICEXTRA"
          className="playerImage"
        />
      );
    }
  };

  // showImage = () => {
  //   const data = this.state.imageSrc;
  //   const ImageTag = ({ data }) => (
  //     <img src={`data:image/jpeg;base64,${data}`} />
  //   );
  //   return <ImageTag data={data} />;
  // };

  componentDidMount() {
    axios.get(process.env.REACT_APP_TEAM_LIST).then(res => {
      this.setState({
        teamList: res.data
      });
    });
    axios.get(process.env.REACT_APP_PLAYER_LIST).then(res => {
      this.setState({
        playerList: res.data,
        player: res.data.filter(
          p =>
            p.email_id.toLowerCase() === this.state.playerEmailId.toLowerCase()
        )
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

    // get image from database directly where column 'image' (as in res.data[0].image) conatins the
    // image data in base64 format. If no data present, send a default image
    // axios
    //   .get(process.env.REACT_APP_GET_IMAGE, {
    //     params: { email_id: this.state.playerEmailId }
    //   })
    //   .then(res => {
    //     // default photo is a photo against user_id = 0
    //     const defaultImage = res.data.filter(r => r.user_id === 1)[0].image; // this is base64 data
    //     // if user does not have a photo, send default photo
    //     const data =
    //       res.data.filter(
    //         r => r.email_id.toLowerCase() === this.state.playerEmailId.toLowerCase()
    //       ).length === 0
    //         ? defaultImage
    //         : res.data.filter(
    //             r =>
    //               r.email_id.toLowerCase() ===
    //               this.state.playerEmailId.toLowerCase()
    //           )[0].image;
    //     // const base64DataToBinary = data.replace(/^data:image\/png;base64,/, "");
    //     // const imageSrc = fs.writeFile("image.jpg", base64Data, "base64", function(
    //     //   err
    //     // ) {
    //     //   console.log(err);
    //     // });
    //     this.setState({
    //       imageList: res.data,
    //       imageSrc: data
    //     });
    //   });

    // get image from database directly where column 'image' (as in res.data[0].image) conatins the
    // image data in base64 format
    // axios
    //   .get(process.env.REACT_APP_GET_IMAGE, {
    //     params: { email_id: this.state.playerEmailId }
    //   })
    //   .then(res => {
    //     if (res.data.length > 0) {
    //       this.setState({
    //         imageSrc: res.data[0].image
    //       });
    //     }
    //   });

    // get image from s3
    axios
      .get(process.env.REACT_APP_GET_IMAGE_S3, {
        params: { email_id: this.state.playerEmailId }
      })
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            imageSrc: res.data[0].image_data,
            userAlreadyHasImage_id: res.data[0].id,
            userAlreadyHasImage_userId: res.data[0].user_id,
            isDefaultImage: 0
          });
        }
      });

    if (
      this.state.userEmail.toLowerCase() ===
      this.state.playerEmailId.toLowerCase()
    ) {
      this.setState({ showEdit: true });
    }
  }

  render() {
    // const data = this.state.imageSrc;
    // const ImageTag = ({ data }) => (
    //   <img src={`data:image/png;base64,${data}`} />
    // );
    // console.log(GC);
    this.tbl = new tblHeaderClass();
    // console.log("config var");
    // console.log(config.REACT_APP_GET_UMPIRE);
    return (
      <div id="pageTop">
        <NavbarDispClass userEmail={this.state.userEmail} />
        <div className="container playerDetailsTbl">
          <h1 className="pageHead">{this.props.header}</h1>
          <div className="inlineParent">
            <div className="inlineChild">
              {/* <img src={ball} alt="CRICEXTRA" className="playerImage" /> */}
              {/* <img
                src={this.state.imageSrc}
                alt="CRICEXTRA"
                className="playerImage"
              /> */}
              {this.showImage(this.state.imageSrc)}
              {/* <div>
                Attach Photo
                <input
                  type="file"
                  name="file"
                  id="userPhotoId"
                  onChange={this.fileChangeHandler}
                />
                <button onClick={this.fileUpload}>Upload</button>
              </div> */}
              {this.state.showEdit ? (
                <div>
                  {/* <form method="post" action="#" id="#"> */}
                  <div className="form-group files">
                    <label>Upload Your File </label>
                    <input
                      type="file"
                      className="form-control"
                      multiple=""
                      name="fileName"
                      // accept="image/*,video/*"
                      // accept=".jpg"
                      onChange={this.fileChangeHandler}
                    />
                  </div>
                  {/* </form> */}

                  <this.photoAlert />
                  <button onClick={this.fileUpload}>Upload</button>
                </div>
              ) : null}
            </div>
            <table className="inlineChild">
              <tbody>
                {this.state.player.length === 0
                  ? null
                  : this.verticalTable(this.state.player)}
              </tbody>
            </table>
          </div>
        </div>
        <a href="#pageTop">
          <div className="topBtn">Top</div>
        </a>
        <NavbarFooterClass />
      </div>
    );
  }
}

export default PlayerDetailsClass;
