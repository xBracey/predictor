import React from "react";
import Head from "next/head";

import Header from "../components/header";
import ResponsePopup from "../components/responsePopup";
import AllLeagues from "../components/allLeagues";
import { apiPostRequest } from "../lib/api";

class League extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      success: null,
      leagues: []
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.joinResponse = this.joinResponse.bind(this);
    this.onResponseClose = this.onResponseClose.bind(this);
    this.addResponse = this.addResponse.bind(this);
  }

  handleAdd(event) {
    event.preventDefault();
    const displayName = event.target.displayName.value;
    const leagueName = event.target.leagueName.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    const error = !displayName.trim()
      ? "Display Name cannot be empty"
      : !leagueName.trim()
      ? "League Name cannot be empty"
      : !password.trim()
      ? "Password cannot be empty"
      : password !== confirmPassword
      ? "Passwords do not match"
      : null;

    if (error) {
      this.setState({ error });
      return;
    }

    apiPostRequest("api/leagues/create", "POST", this.addResponse, {
      displayName,
      leagueName,
      password
    });
  }

  onResponseClose() {
    this.setState({ error: null, success: null });
  }

  addResponse(response) {
    response.json().then(responseJson => {
      if (response.ok) {
        const success = `You've successfully created ${responseJson.displayName}`;
        this.setState({ success });
      } else {
        this.setState({ error: responseJson.error });
      }
    });
  }

  joinResponse(response) {
    response.json().then(responseJson => {
      if (response.ok) {
        const success = `You've successfully joined ${responseJson.leagueName}`;
        this.setState({ success });
      } else {
        this.setState({ error: responseJson.error });
      }

      setTimeout(() => {
        this.setState({ error: null, success: null });
      }, 2000);
    });
  }

  handleJoin(event) {
    event.preventDefault();
    const leagueName = event.target.leagueName.value;
    const password = event.target.password.value;

    const error = !leagueName.trim()
      ? "League Name cannot be empty"
      : !password.trim()
      ? "Password cannot be empty"
      : null;

    if (error) {
      this.setState({ error });
      return;
    }

    apiPostRequest("api/leagues/add", "POST", this.joinResponse, {
      leagueName,
      password
    });
  }

  renderAddCreateLeagues() {
    return (
      <div className="add-create-leagues">
        <div className="add-league">
          <h2>Join Existing League</h2>
          <form onSubmit={this.handleJoin}>
            <div>
              <label htmlFor="leagueName"> League Name </label>
              <input type="text" name="leagueName" />
            </div>

            <div>
              <label htmlFor="password"> League Password </label>
              <input type="password" name="password" />
            </div>

            <div className="submit-container">
              <input type="submit" value="Join" />
            </div>
          </form>
        </div>
        <div className="create-league">
          <h2>Create New League</h2>
          <form onSubmit={this.handleAdd}>
            <div>
              <label htmlFor="displayName"> Display Name </label>
              <input type="text" name="displayName" />
            </div>

            <div>
              <label htmlFor="leagueName"> League Name </label>
              <input type="text" name="leagueName" />
            </div>

            <div>
              <label htmlFor="password"> League Password </label>
              <input type="password" name="password" />
            </div>

            <div>
              <label htmlFor="confirmPassword"> Confirm Password </label>
              <input type="password" name="confirmPassword" />
            </div>

            <div className="submit-container">
              <input type="submit" value="Create" />
            </div>
          </form>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Head>
          <title>Leagues</title>
        </Head>
        <Header />
        {this.renderAddCreateLeagues()}
        <AllLeagues />
        <ResponsePopup
          onClose={this.onResponseClose}
          error={this.state.error}
          success={this.state.success}
        />
      </div>
    );
  }
}

export default League;
