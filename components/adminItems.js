import React from "react";
import Link from "next/link";

import AdminItem from "./adminItem";

class AdminItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: null
    };

    this.getSuccessful = this.getSuccessful.bind(this);
    this.getFail = this.getFail.bind(this);
    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
  }

  componentDidMount() {
    this.apiCall();
  }

  getSuccessful(result) {
    console.log(result);
    this.setState({ items: result });
  }

  getFail(response) {
    console.log(response);
  }

  readResponseAsJSON(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw response;
    }
  }

  apiCall() {
    fetch(`/api/${this.props.apiPrefix}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.readResponseAsJSON)
      .then(this.getSuccessful)
      .catch(this.getFail);
  }

  renderTable() {
    const headerComponent = this.props.fields.map(field => <th>{field}</th>);

    const editComponent = this.props.noEdit ? null : <th>Edit</th>;

    return (
      <table>
        <tr>
          {headerComponent}
          {editComponent}
          <th>Delete</th>
        </tr>
        {this.renderItems()}
      </table>
    );
  }

  renderItems() {
    return this.state.items
      ? this.state.items.map(item => (
          <AdminItem
            apiPrefix={this.props.apiPrefix}
            item={item}
            fields={this.props.fields}
            idField={this.props.idField}
            noEdit={this.props.noEdit}
          />
        ))
      : null;
  }

  render() {
    return <div className="admin-items">{this.renderTable()}</div>;
  }
}

export default AdminItems;
