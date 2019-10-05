import React from "react";
import Link from "next/link";

class AdminItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.fields);
  }

  renderFields() {
    const { fields, item } = this.props;

    return fields.map(field => <td>{item[field]}</td>);
  }

  render() {
    return <tr>{this.renderFields()}</tr>;
  }
}

export default AdminItem;
