import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";

class AddGroup extends React.Component {
  constructor(props) {
    super(props);

    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
    this.getFail = this.getFail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addGroupSuccessful = this.addGroupSuccessful.bind(this);
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

  addGroupSuccessful(result) {
    window.alert("Group Successfully Added");

    window.history.back();
  }

  handleSubmit(event) {
    event.preventDefault();
    const number = event.target.number.value;

    fetch(`/api/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ number })
    })
      .then(this.readResponseAsJSON)
      .then(this.addGroupSuccessful)
      .catch(this.getFail);
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
