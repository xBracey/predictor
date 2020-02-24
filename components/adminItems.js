import React from "react";
import Link from "next/link";

import AdminItem from "./adminItem";
import { apiGetRequest } from "../lib/api";

class AdminItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: null,
      items: null,
      itemFilters: []
    };

    this.getSuccessful = this.getSuccessful.bind(this);
    this.onFilterSelect = this.onFilterSelect.bind(this);
  }

  componentDidMount() {
    this.apiCall();
  }

  getSuccessful(response) {
    response.json().then(results => {
      const itemFilters = results.map(result => result[this.props.filterName]);

      this.setState({
        items: results,
        itemFilters: Array.from(new Set(itemFilters)).sort()
      });
    });
  }

  apiCall() {
    apiGetRequest(`/api/${this.props.apiPrefix}`, "GET", this.getSuccessful);
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
    const {
      apiPrefix,
      idField,
      fields,
      filterName,
      noEdit,
      sortField
    } = this.props;

    return items
      ? items
          .filter(item => item[filterName] === filter || !filter)
          .sort((item1, item2) => {
            return item1[sortField] > item2[sortField] ? 1 : -1;
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
