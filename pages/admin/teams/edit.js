import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";
import { apiGetRequest, apiPostRequest } from "../../../lib/api";

class TeamEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { id: null, team: null, groups: null };

    this.getGroupsSuccessful = this.getGroupsSuccessful.bind(this);
    this.getTeamSuccessful = this.getTeamSuccessful.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTeamSuccessful = this.updateTeamSuccessful.bind(this);
  }

  getTeamSuccessful(response) {
    response.json(result => {
      if (result) {
        this.setState({ team: result });
      }
    });
  }

  getGroupsSuccessful(response) {
    response.json(result => {
      if (result) {
        this.setState({ groups: result });
      }
    });
  }

  getFail(response) {
    console.log(response);
  }

  getTeam(id) {
    apiGetRequest(`/api/teams/${id}`, "GET", this.getTeamSuccessful);
  }

  getGroups() {
    apiGetRequest(`/api/groups`, "GET", this.getGroupsSuccessful);
  }

  updateTeamSuccessful(response) {
    if (response.ok) {
      window.alert("Team Successfully Updated");
      window.history.back();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state.team;
    const groupNumber = event.target.groupNumber.value;

    apiPostRequest(`/api/teams`, "PUT", this.updateTeamSuccessful, {
      name,
      groupNumber
    });
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has("id")) {
      const id = searchParams.get("id");
      this.setState({ id });

      this.getGroups();
      this.getTeam(id);
    }
  }

  render() {
    const team = this.state.team ? this.state.team.name : "";

    const groups =
      !this.state.groups || !this.state.team
        ? null
        : this.state.groups.map(group => {
            const selected = group.number === this.state.team.groupNumber;
            return (
              <option value={group.number} selected={selected}>
                {group.number}
              </option>
            );
          });

    return (
      <div>
        <Head>
          <title>Admin</title>
        </Head>
        <Header isAdmin={false} admin={true} />
        <div className="page-outer-container">
          <div className="page-inner-container add-edit-container">
            <h1> {team} </h1>
            <form onSubmit={this.handleSubmit}>
              <select id="groupNumber">{groups}</select>
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TeamEdit;
