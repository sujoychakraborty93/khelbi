import axios from "axios";
class Auth {
  constructor() {
    this.authenticated = false;
    this.red = this.authenticate();
    // localStorage.setItem("loggedIn", false);
    // sessionStorage.setItem("loggedIn", false);
  }

  // login(cb) {
  //   this.authenticated = true;
  //   cb();
  // }
  setTrue() {
    this.authenticated = true;
    localStorage.setItem("loggedIn", true);
    sessionStorage.setItem("loggedIn", true);
  }

  // logout(cb) {
  //   this.authenticated = false;
  //   cb();
  // }

  setFalse() {
    this.authenticated = false;
    localStorage.setItem("loggedIn", false);
    sessionStorage.setItem("loggedIn", false);
  }

  isAuthenticated() {
    return this.authenticated;
  }

  authenticate = async () => {
    // console.log("inside authenticate");
    const res = await axios.get(process.env.REACT_APP_GET_AUTHENTICATE, {
      withCredentials: true
    });

    // console.log("inside authenticate then");
    // console.log(res.data);
    if (!res.data || res.data.data === "" || res.data === undefined) {
      // console.log("inside authenticate then if");
    } else {
      // console.log("inside authenticate then else");
      this.setTrue();
    }
    // cb();
    return this.authenticated;
  };

  //   authenticate = () => {
  //     console.log("inside authenticate");
  //     axios
  //       .get(process.env.REACT_APP_GET_AUTHENTICATE, { withCredentials: true })
  //       .then(res => {
  //         console.log("inside authenticate then");
  //         console.log(res.data);
  //         // if (res.status === 200) {
  //         if (!res.data || res.data.data === "" || res.data === undefined) {
  //           console.log("inside authenticate then if");
  //           //   this.setState({ msg: "User does not have permission" });
  //         } else {
  //           console.log("inside authenticate then else");
  //           //   this.setState({ authentic: true });
  //           this.authenticated = true;
  //         }
  //       })
  //       .catch(error => {
  //         console.log("inside authenticate catch", error);
  //         // this.setState({ msg: error });
  //       });
  //   };
}

export default new Auth();
