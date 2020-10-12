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
      selectedRow: 0
    };
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
  renderRow = (row, id) => {

    return (
      <StructuredListRow key={id} onClick={() => this.onRowClick(id)}>
        <div>
          <StructuredListInput
            id={`row-${id}`}
            value="row-0"
            title="row-0"
            name="row-0"
            checked={this.state.selectedRow === id}
          />
          <StructuredListCell>
            <Icon
              className="bx--structured-list-svg"
              icon={iconCheckmarkSolid}
            />
          </StructuredListCell>
        </div>
        {

          this.columns.map((col, i) => {
            if (row[col] !== "password" && col == "SecretValue") {
              return (
                <StructuredListCell key={col} className="simple-list-row">
                  <div>
                    <input
                      type={this.state.hidden ? "password" : "text"}
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                    <button onClick={this.toggleShow}>Show / Hide</button>
                  </div>
                </StructuredListCell>
              );

            } else {

              return (

                <StructuredListCell key={col} className="simple-list-row">
                  {row[col]}
                </StructuredListCell>
              );

            }
          })}
      </StructuredListRow>
    );
  };
  componentDidMount() {
    const apiUrl = '/health';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ items: data });
      });
  }
  render() {
    const data = this.state.items;
    return (
      <div className="bx--grid pattern-container">
        <Header
          title="Secrets"
          subtitle="Displaying Secret From Key Protect with Continues Delivery ArgoCD"
        />
        <div className="bx--row">
          <div className="bx--col-xs-12">
            <StructuredListWrapper selection border>
              <StructuredListHead>
                <StructuredListRow head>
                  <StructuredListCell head />
                  {this.columns.map(key => {
                    return (
                      <StructuredListCell head key={key}>
                        {key.charAt(0).toUpperCase() +
                          key.slice(1).replace(/([A-Z])/g, " $1")}
                      </StructuredListCell>
                    );
                  })}
                </StructuredListRow>
              </StructuredListHead>

              <StructuredListBody>
                {data.map((row, i) => {
                  return this.renderRow(row, i);
                })}
              </StructuredListBody>
            </StructuredListWrapper>
          </div>
        </div>
      </div>
    );
  }
}

export default SimpleList;
