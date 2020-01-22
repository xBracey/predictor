import React from "react";
import Head from "next/head";

import Header from "../components/header";
import ResponsePopup from "../components/responsePopup";

class League extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      success: null
    };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.joinResponse = this.joinResponse.bind(this);
    this.onResponseClose = this.onResponseClose.bind(this);
  }

  handleAdd(event) {}

  onResponseClose() {
    this.setState({ error: null, success: null });
  }

  joinResponse(response) {
    response.json().then(responseJson => {
      console.log(responseJson);
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

    fetch("api/leagues/add", {
      method: "POST",
      body: JSON.stringify({ leagueName, password }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(this.joinResponse);
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

            <div className="submit-container">
              <input type="submit" value="Create" />
            </div>
          </form>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <Head>
          <title>League</title>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
          <link href="/static/main.css" rel="stylesheet" />
        </Head>
        <Header />
        {this.renderAddCreateLeagues()}
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
