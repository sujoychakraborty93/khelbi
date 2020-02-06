import React, { Component } from "react";
import tblHeaderClass from "./createTableHeader";
import axios from "axios";

class RequestAllClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  createHeader(colHead) {
    let heads = colHead.map(col => {
      return <th key={col}>{col}</th>;
    });
    return heads;
  }
  render() {
    return (
      <div>
        <Table></Table>
      </div>
    );
  }
}

export default RequestAllClass;
