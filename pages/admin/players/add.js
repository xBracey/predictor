import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";
import AdminItems from "../../../components/adminItems";
import { apiGetRequest, apiPostRequest } from "../../../lib/api";

class PlayerAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = { teams: null };

    this.getTeamSuccessful = this.getTeamSuccessful.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePlayerSuccessful = this.updatePlayerSuccessful.bind(this);
  }

  getTeamSuccessful(response) {
    response.json(result => {
      if (result) {
        this.setState({ teams: result });
      }
    });
  }

  getTeams() {
    apiGetRequest(`/api/teams`, "GET", this.getTeamSuccessful);
  }

  updatePlayerSuccessful(response) {
    if (response.ok) {
      window.alert("Player Successfully Added");
      window.history.back();
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const teamName = event.target.teamName.value;

    apiPostRequest(`/api/players`, "POST", this.updatePlayerSuccessful, {
      name,
      teamName
    });
  }

  componentDidMount() {
    this.getTeams();
  }

  render() {
    const teams = !this.state.teams
      ? null
      : this.state.teams.map(team => (
          <option value={team.name}>{team.name}</option>
        ));

    return (
      <div>
        <Head>
          <title>Admin</title>
        </Head>
        <Header isAdmin={false} admin={true} />
        <div className="page-outer-container">
          <div className="page-inner-container add-edit-container">
            <h1> Add Player </h1>
            <form onSubmit={this.handleSubmit}>
              <input type="text" id="name" />
              <select id="teamName">{teams}</select>
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerAdd;
