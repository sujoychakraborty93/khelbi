import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
import HomePageClass from "./components/homePage";
import HomeClass from "./components/home-incomplete";
import AllMatchesPageClass from "./components/allMatchesPage";
import MyTeamMatchPageClass from "./components/myTeamMatchPage";
import TeamsClass from "./components/teamsPage";
import PlayerClass from "./components/playerPage";
import VenueClass from "./components/venuePage";
import UmpireClass from "./components/umpirepage";
import LoginClass from "./components/loginPage";
import RegistrationClass from "./components/registrationPage";
import ForgotPasswordClass from "./components/forgotPasswordPage";
// import auth from "./components/auth";
import RequestOverviewClass from "./components/requestOverview";
import RequestAllClass from "./components/requestAll";
import RequestMyClass from "./components/requestMy";
import RequestSubmitClass from "./components/requestSubmit";
import RequestDetailsClass from "./components/requestDetails";
import ErrorClass from "./components/errorPage";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  // console.log("auth.isAuthenticated()");
  // console.log(auth.isAuthenticated());
  // console.log(localStorage.getItem("loggedIn"));
  // console.log(sessionStorage.getItem("loggedIn"));

  return (
    <Route
      {...rest}
      render={({ location }) =>
        // auth.isAuthenticated() ? (
        sessionStorage.getItem("loggedIn") === "true" ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

// const LoginRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest} render={props => (
//       auth.isAuthenticated() ? (
//         <Redirect to={{
//           pathname: '/private-route',
//           state: { from: props.location }
//         }} />
//       ) : (
//         <Component {...props} />
//       )
//   )} />
// );

function App() {
  // const authorized = auth.authenticate();
  // console.log("authorized");
  // console.log(authorized);
  // console.log(auth.isAuthenticated);
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={LoginClass} />
          <Route path="/login" component={LoginClass} />
          <Route path="/register" component={RegistrationClass} />
          <Route path="/forgotPassword" component={ForgotPasswordClass} />
          {/* </Switch>
        {console.log("auth.isAuthenticated()")}
        {console.log(auth.isAuthenticated())}
        {auth.isAuthenticated() === true ? (
          <Switch> */}
          {/* <Route path="/home" component={HomePageClass} /> */}
          <PrivateRoute path="/home">
            <HomePageClass />
          </PrivateRoute>
          <Route path="/house" component={HomeClass} />
          {/* <Route path="/allMatchSchedule" component={AllMatchesPageClass} /> */}
          <PrivateRoute path="/allMatchSchedule">
            <AllMatchesPageClass />
          </PrivateRoute>
          {/* <Route path="/myTeamSchedule" component={MyTeamMatchPageClass} /> */}
          <PrivateRoute path="/myTeamSchedule">
            <MyTeamMatchPageClass />
          </PrivateRoute>
          {/* <Route path="/teamsList" exact component={TeamsClass} /> */}
          <PrivateRoute path="/teamsList">
            <TeamsClass />
          </PrivateRoute>
          {/* {console.log("5")} */}
          {/* <Route path="/venuesList" exact component={VenueClass} /> */}
          <PrivateRoute path="/venuesList">
            <VenueClass />
          </PrivateRoute>
          {/* {console.log("6")} */}
          {/* <Route path="/umpiresList" exact component={UmpireClass} /> */}
          <PrivateRoute path="/umpiresList">
            <UmpireClass />
          </PrivateRoute>
          {/* {console.log("7")} */}
          {/* <Route path="/playersList" component={PlayerClass} /> */}
          <PrivateRoute path="/playersList">
            <PlayerClass />
          </PrivateRoute>
          {/* {console.log("8")} */}
          {/* <Route path="/player/:id?" component={PlayerClass} /> */}
          <PrivateRoute path="/player/:playerEmailId?">
            <PlayerClass />
          </PrivateRoute>
          {/* {console.log("9")} */}
          {/* <Route path="/request" component={RequestPageClass} /> */}
          {/* <PrivateRoute path="/request">
            <RequestPageClass />
          </PrivateRoute> */}
          <PrivateRoute path="/requestOverview">
            <RequestOverviewClass />
          </PrivateRoute>
          <PrivateRoute path="/allRequest">
            <RequestAllClass />
          </PrivateRoute>
          <PrivateRoute path="/myRequest">
            <RequestMyClass />
          </PrivateRoute>
          <PrivateRoute path="/submitRequest">
            <RequestSubmitClass />
          </PrivateRoute>
          <PrivateRoute path="/request/:id?">
            <RequestDetailsClass />
          </PrivateRoute>
          <Route component={ErrorClass} />
        </Switch>
        {/* ) : (
        <Redirect to="/" />
        )} */}
      </Router>
    </div>
  );
}

export default App;
