import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";
import AdminItems from "../../../components/adminItems";
import { apiGetRequest, apiPostRequest } from "../../../lib/api";

class PlayerEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { id: null, player: null, teams: null };

    this.getPlayerSuccessful = this.getPlayerSuccessful.bind(this);
    this.getTeamSuccessful = this.getTeamSuccessful.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePlayerSuccessful = this.updatePlayerSuccessful.bind(this);
  }

  getPlayerSuccessful(response) {
    response.json(result => {
      if (result) {
        this.setState({ player: result });
      }
    });
  }

  getTeamSuccessful(response) {
    response.json(result => {
      if (result) {
        this.setState({ teams: result });
      }
    });
  }

  getPlayer(id) {
    apiGetRequest(`/api/players/${id}`, "GET", this.getPlayerSuccessful);
  }

  getTeams() {
    apiGetRequest(`/api/teams`, "GET", this.getTeamSuccessful);
  }

  updatePlayerSuccessful(response) {
    if (response.ok) {
      window.alert("Player Successfully Updated");
      window.history.back();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state.player;
    const teamName = event.target.teamName.value;

    apiPostRequest(`/api/players`, "PUT", this.updatePlayerSuccessful, {
      name,
      teamName
    });
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has("id")) {
      const id = searchParams.get("id");
      this.setState({ id });

      this.getTeams();
      this.getPlayer(id);
    }
  }

  render() {
    const name = this.state.player ? this.state.player.name : "";

    const teams =
      !this.state.teams || !this.state.player
        ? null
        : this.state.teams.map(team => {
            const selected = team.name === this.state.player.teamName;
            return (
              <option value={team.name} selected={selected}>
                {team.name}
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
            <h1> {name} </h1>
            <form onSubmit={this.handleSubmit}>
              <select id="teamName">{teams}</select>
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerEdit;
