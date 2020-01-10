import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";

class TeamAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = { id: null, groups: null };

    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
    this.getGroupsSuccessful = this.getGroupsSuccessful.bind(this);
    this.getFail = this.getFail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTeamSuccessful = this.updateTeamSuccessful.bind(this);
  }

  getGroupsSuccessful(result) {
    if (result) {
      this.setState({ groups: result });
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

  getGroups() {
    fetch(`/api/groups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.readResponseAsJSON)
      .then(this.getGroupsSuccessful)
      .catch(this.getFail);
  }

  updateTeamSuccessful(result) {
    window.alert("Team Successfully Added");

    window.history.back();
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const groupNumber = event.target.groupNumber.value;

    fetch(`/api/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, groupNumber })
    })
      .then(this.readResponseAsJSON)
      .then(this.updateTeamSuccessful)
      .catch(this.getFail);
  }

  componentDidMount() {
    this.getGroups();
  }

  render() {
    const groups = !this.state.groups
      ? null
      : this.state.groups.map(group => (
          <option value={group.number}>{group.number}</option>
        ));

    return (
      <div>
        <Head>
          <title>Admin</title>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
          <link href="/static/main.css" rel="stylesheet" />
        </Head>
        <Header isAdmin={false} admin={true} />
        <div className="page-outer-container">
          <div className="page-inner-container add-edit-container">
            <h1> Add Team </h1>
            <form onSubmit={this.handleSubmit}>
              <input type="text" id="name" />
              <select id="groupNumber">{groups}</select>
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamAdd;
