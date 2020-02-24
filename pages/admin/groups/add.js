import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";
import { apiPostRequest } from "../../../lib/api";

class AddGroup extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.addGroupSuccessful = this.addGroupSuccessful.bind(this);
  }

  addGroupSuccessful(response) {
    if (response.ok) {
      response.json().then(responseJson => {
        window.alert("Group Successfully Added");
        window.history.back();
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const number = event.target.number.value;

    apiPostRequest(`/api/groups`, "POST", this.addGroupSuccessful, { number });
  }

  render() {
    return (
      <div>
        <Head>
          <title>Admin</title>
        </Head>
        <Header isAdmin={false} admin={true} />
        <div className="page-outer-container">
          <div className="page-inner-container add-edit-container">
            <h1> Add Group </h1>
            <form onSubmit={this.handleSubmit}>
              <input type="text" id="number" />
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddGroup;
