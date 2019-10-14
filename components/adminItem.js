import React from "react";
import Link from "next/link";

class AdminItem extends React.Component {
  constructor(props) {
    super(props);

    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.getSuccessful = this.getSuccessful.bind(this);
    this.getFail = this.getFail.bind(this);
    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
  }

  getSuccessful(result) {
    if (result) {
      window.location.reload();
    }
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

  onEdit() {
    const { item, idField } = this.props;
    window.location.href = `${window.location.href}/edit?id=${encodeURI(
      item[idField]
    )}`;
  }

  onDelete() {
    const { item, idField } = this.props;
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirm) {
      fetch(`/api/${this.props.apiPrefix}/${item[idField]}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(this.readResponseAsJSON)
        .then(this.getSuccessful)
        .catch(this.getFail);
    }
  }

  renderFields() {
    const { fields, item } = this.props;

    return fields.map(field => <td>{item[field]}</td>);
  }

  renderEdit() {
    return (
      <td>
        <button onClick={this.onEdit}>Edit</button>
      </td>
    );
  }

  renderDelete() {
    return (
      <td>
        <button onClick={this.onDelete}>Delete</button>
      </td>
    );
  }

  render() {
    return (
      <tr>
        {this.renderFields()}
        {this.renderEdit()}
        {this.renderDelete()}
      </tr>
    );
  }
}

export default AdminItem;
