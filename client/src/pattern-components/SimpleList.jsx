import React, { Component } from "react";
import {
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
  StructuredListHead,
  StructuredListBody,
  StructuredListInput,
  Icon
} from "carbon-components-react";
import { iconCheckmarkSolid } from "carbon-icons";
import Header from "./Header";
import "./patterns.scss";

class SimpleList extends Component {
  columns = ['SecretName', 'SecretValue'];
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      selectedRow: 0,
      hidden: true,
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  onRowClick = id => {
    this.setState({ selectedRow: id });
  };
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  componentDidMount() {
    const apiUrl = '/health';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.setState({ items: data });
      });
  }
  renderTableHeader() {
    let header = ["SecretName", "SecretValue", "Action"]
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  render() {
    console.log(this.state.items);
    return (
      <div>
        <h1 id='title' class="pattern-title">Secrets</h1>
        <table id='students'>
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    )
  }
  renderTableData() {

    return this.state.items.map((student, index) => {
      console.log(index)
      const { SecretName, SecretValue } = student //destructuring
      if (index == 1) {
        return (
          <tr>
            <td>{SecretName}</td>
            <td>
              <input
                type={this.state.hidden ? "password" : "text"}
                value={SecretValue}
                onChange={this.handlePasswordChange}
              />
            </td>
            <td>
              <button onClick={this.toggleShow}>Show / Hide</button>
            </td>
          </tr>
        )
      } else {
        return (
          <tr>
            <td>{SecretName}</td>
            <td>{SecretValue}</td>
            <td>NA</td>
          </tr>
        )
      }

    })
  }


}

export default SimpleList;
