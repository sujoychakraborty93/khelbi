import React, { Component } from "react";

class tblHeaderClass extends Component {
  state = {};

  createHeader(colHead) {
    let heads = colHead.map(col => {
      return <th key={col}>{col}</th>;
    });
    return heads;
  }

  // render() {
  //     return (  );
  // }
}

export default tblHeaderClass;
