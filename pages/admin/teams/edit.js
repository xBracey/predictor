import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";
import "../../../styles/main.css";

class TeamEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { id: null, team: null, groups: null };

    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
    this.getGroupsSuccessful = this.getGroupsSuccessful.bind(this);
    this.getTeamSuccessful = this.getTeamSuccessful.bind(this);
    this.getFail = this.getFail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateTeamSuccessful = this.updateTeamSuccessful.bind(this);
  }

  getTeamSuccessful(result) {
    if (result) {
      this.setState({ team: result });
    }
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

  getTeam(id) {
    fetch(`/api/teams/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.readResponseAsJSON)
      .then(this.getTeamSuccessful)
      .catch(this.getFail);
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
    window.alert("Team Successfully Updated");

    window.history.back();
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state.team;
    const groupNumber = event.target.groupNumber.value;

    fetch(`/api/teams`, {
      method: "PUT",
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
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
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
