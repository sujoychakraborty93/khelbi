import React, { Component } from "react";
import NavbarDispClass from "./navbarTop";
import NavbarFooterClass from "./navbarFooter";
// import { NavLink as RouteNavLink } from "react-router-dom";

class HomeClass extends Component {
  state = {};
  render() {
    return (
      <div className="mainHome">
        <NavbarDispClass />
        <header className="masthead">
          <div className="container h-100">
            <div className="row h-100 align-items-center justify-content-center text-center">
              <div className="col-lg-10 align-self-end">
                <div className="homeBtn-box">
                  <div class="openReqSec"></div>
                  {/* <a className="homeBtn js-scroll-trigger" href="/Home">
                    My Requests
                  </a>
                  <a className="homeBtn js-scroll-trigger" href="/Home">
                    Open Requests
                  </a>
                  <a className="homeBtn js-scroll-trigger" href="/Home">
                    Submit Requests
                  </a> */}
                </div>
                {/* <h1 className="text-uppercase text-white font-weight-bold">
                  Your Favorite Source of Free Bootstrap Themes
                </h1> */}
                <hr className="divider my-4" />
              </div>
              <div className="col-lg-8 align-self-baseline">
                {/* <p className="text-white-75 font-weight-light mb-5">
                  Start Bootstrap can help you build better websites using the
                  Bootstrap framework! Just download a theme and start
                  customizing, no strings attached!
                </p> */}
                <a
                  //   className="btn btn-primary btn-xl js-scroll-trigger"
                  className="homeBtn js-scroll-trigger"
                  href="/Home"
                >
                  Find Out More
                </a>
              </div>
            </div>
          </div>
        </header>
        <NavbarFooterClass />
      </div>
    );
  }
}

export default HomeClass;
