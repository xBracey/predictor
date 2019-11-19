import React from "react";
import Link from "next/link";

import AdminItem from "./adminItem";

class AdminItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: null,
      items: null,
      itemFilters: []
    };

    this.getSuccessful = this.getSuccessful.bind(this);
    this.getFail = this.getFail.bind(this);
    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
  }

  componentDidMount() {
    this.apiCall();
  }

  getSuccessful(results) {
    const itemFilters = results.map(result => result[this.props.filterName]);

    this.setState({
      items: results,
      itemFilters: Array.from(new Set(itemFilters)).sort()
    });
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

  onFilterSelect(event) {
    this.setState({ filter: event.target.value });
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

  renderFilter() {
    console.log(this.state.itemFilters);

    if (!this.state.itemFilters || !this.props.filterName) {
      return;
    }

    const filterComponent = this.state.itemFilters.map(singleFilter => (
      <option value={singleFilter}>{singleFilter}</option>
    ));

    return (
      <select onChange={this.onFilterSelect}>
        <option value="">All</option>
        {filterComponent}
      </select>
    );
  }

  renderItems() {
    const { filter, items } = this.state;
    const { apiPrefix, idField, fields, filterName, noEdit } = this.props;

    return items
      ? items
          .filter(item => item[filterName] === filter || !filter)
          .sort((item1, item2) => {
            return item1[idField] > item2[idField] ? 1 : -1;
          })
          .map(item => (
            <AdminItem
              apiPrefix={apiPrefix}
              item={item}
              fields={fields}
              idField={idField}
              noEdit={noEdit}
            />
          ))
      : null;
  }

  render() {
    return (
      <div className="admin-items">
        {this.renderFilter()}
        {this.renderTable()}
      </div>
    );
  }
}

export default AdminItems;
