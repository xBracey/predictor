import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";
import AdminItems from "../../../components/adminItems";
import "../../../styles/main.css";

class PlayerAdd extends React.Component {
  constructor(props) {
    super(props);

    this.state = { teams: null };

    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
    this.getTeamSuccessful = this.getTeamSuccessful.bind(this);
    this.getFail = this.getFail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePlayerSuccessful = this.updatePlayerSuccessful.bind(this);
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
    window.alert("Player Successfully Added");

    window.history.back();
  }

  handleSubmit(event) {
    event.preventDefault();

    const name = event.target.name.value;
    const teamName = event.target.teamName.value;

    fetch(`/api/players`, {
      method: "POST",
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
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
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
