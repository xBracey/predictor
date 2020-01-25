import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";
import AdminItems from "../../../components/adminItems";

class PlayerEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { id: null, player: null, teams: null };

    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
    this.getPlayerSuccessful = this.getPlayerSuccessful.bind(this);
    this.getTeamSuccessful = this.getTeamSuccessful.bind(this);
    this.getFail = this.getFail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePlayerSuccessful = this.updatePlayerSuccessful.bind(this);
  }

  getPlayerSuccessful(result) {
    if (result) {
      this.setState({ player: result });
    }
  }

  getTeamSuccessful(result) {
    if (result) {
      this.setState({ teams: result });
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

  getPlayer(id) {
    fetch(`/api/players/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.readResponseAsJSON)
      .then(this.getPlayerSuccessful)
      .catch(this.getFail);
  }

  getTeams() {
    fetch(`/api/teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.readResponseAsJSON)
      .then(this.getTeamSuccessful)
      .catch(this.getFail);
  }

  updatePlayerSuccessful(result) {
    window.alert("Player Successfully Updated");

    window.history.back();
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name } = this.state.player;
    const teamName = event.target.teamName.value;

    fetch(`/api/players`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, teamName })
    })
      .then(this.readResponseAsJSON)
      .then(this.updatePlayerSuccessful)
      .catch(this.getFail);
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
