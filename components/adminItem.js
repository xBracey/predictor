import React from "react";
import Link from "next/link";

import { apiGetRequest } from "../lib/api";

class AdminItem extends React.Component {
  constructor(props) {
    super(props);

    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.getSuccessful = this.getSuccessful.bind(this);
  }

  getSuccessful(response) {
    if (response.ok) {
      window.location.reload();
    }
  }

  onEdit() {
    const { item, idField } = this.props;
    window.location.href = `${window.location.href}edit?id=${encodeURI(
      item[idField]
    )}`;
  }

  onDelete() {
    const { item, idField } = this.props;
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (confirm) {
      apiGetRequest(
        `/api/${this.props.apiPrefix}/${item[idField]}`,
        "DELETE",
        this.getSuccessful
      );
    }
  }

  renderFields() {
    const { fields, item } = this.props;

    return fields.map(field => <td key={field}>{item[field]}</td>);
  }

  renderEdit() {
    if (this.props.noEdit) {
      return null;
    }

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
