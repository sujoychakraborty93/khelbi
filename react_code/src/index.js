import React from "react";
import ReactDOM from "react-dom";
// import "./index1.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
//import "./index.css";
import "./index1.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import HomePageClass from "./components/homePage";
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "./components/reducer/allReducer";

const store = createStore(allReducers);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
// ReactDOM.render(<HomePageClass />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
