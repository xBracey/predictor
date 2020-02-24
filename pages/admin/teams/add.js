import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";
import { apiGetRequest, apiPostRequest } from "../../../lib/api";

class TeamAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = { id: null, groups: null };

    this.getGroupsSuccessful = this.getGroupsSuccessful.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTeamSuccessful = this.updateTeamSuccessful.bind(this);
  }

  getGroupsSuccessful(response) {
    response.json().then(result => {
      if (result) {
        this.setState({ groups: result });
      }
    });
  }

  getGroups() {
    apiGetRequest(`/api/groups`, "GET", this.getGroupsSuccessful);
  }

  updateTeamSuccessful(response) {
    if (response.ok) {
      window.alert("Team Successfully Added");
      window.history.back();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const groupNumber = event.target.groupNumber.value;

    apiPostRequest(`/api/teams`, "POST", this.updateTeamSuccessful, {
      name,
      groupNumber
    });
  }

  componentDidMount() {
    this.getGroups();
  }

  render() {
    const groups = !this.state.groups
      ? null
      : this.state.groups.map(group => (
          <option key={group.number} value={group.number}>
            {group.number}
          </option>
        ));

    return (
      <div>
        <Head>
          <title>Admin</title>
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
