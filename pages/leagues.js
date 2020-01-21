import React from "react";
import Head from "next/head";

import Header from "../components/header";

class League extends React.Component {
  constructor(props) {
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
  }

  handleAdd() {}
  handleJoin() {}

  renderAddCreateLeagues() {
    return (
      <div className="add-create-leagues">
        <div className="add-league">
          <h2>Add Existing League</h2>
          <form onSubmit={this.handleAdd}>
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
          <h2>Add Existing League</h2>
          <form>
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
      </div>
    );
  }
}

export default League;
