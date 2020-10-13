import React, { Component } from "react";
import {
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
  StructuredListHead,
  StructuredListBody,
  StructuredListInput,
  Icon,
  TextInput,
  Button
} from "carbon-components-react";
import { iconCheckmarkSolid } from "carbon-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
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
      icon: faEye
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden, icon: faEyeSlash });
  }
  onRowClick = id => {
    this.setState({ selectedRow: id });
  };

  renderRow = (row, id) => {
    return (
      <StructuredListRow key={id} onClick={() => this.onRowClick(id)}>
        <div>
          <StructuredListInput
            id={`row-${id}`}
            value="row-0"
            title="row-0"
            name="row-0"
            //defaultChecked={this.state.selectedRow === id}
            checked={this.state.selectedRow === id}
          />
          <StructuredListCell>
            <Icon
              className="bx--structured-list-svg"
              icon={iconCheckmarkSolid}
            />
          </StructuredListCell>
        </div>

        {this.columns.map((col, index) => {

          if (id === 1 && index == 1) {
            return (
              <div>
                <TextInput
                  type={this.state.hidden ? "password" : "text"}
                  value={row[col]}
                  onChange={this.handlePasswordChange} />
                <FontAwesomeIcon icon={this.state.icon} id="passwordhide" onClick={this.toggleShow} id="passwordhide" />

              </div>
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
        console.log(data)
        console.log(data.status)
        this.setState({ items: data });
      });
  }
  render() {
    const data = this.state.items;
    return (
      <div className="bx--grid pattern-container">
        <Header
          title="Secrets"
          subtitle="This application demonstrates secrets management with IBM Secrets Manager and Continous Delivery with ArgoCD."
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