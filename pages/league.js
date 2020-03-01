import React from "react";
import Head from "next/head";

import Header from "../components/header";
import LeagueStandings from "../components/leagueStandings";
import { apiGetRequest } from "../lib/api";

class League extends React.Component {
  static getInitialProps({ query: { id } }) {
    return { leagueId: id };
  }

  constructor(props) {
    super(props);

    this.state = {
      leagueStandings: [],
      leagueInfo: {}
    };

    this.setStandings = this.setStandings.bind(this);
    this.setLeagueInfo = this.setLeagueInfo.bind(this);
  }

  componentDidMount() {
    this.getStandings();
    this.getLeagueInfo();
  }

  getStandings() {
    apiGetRequest(
      `/api/leagues/standings/${this.props.leagueId}`,
      "GET",
      this.setStandings
    );
  }

  setStandings(response) {
    response.json().then(leagueStandings => {
      if (response.ok) {
        this.setState({ leagueStandings });
      } else {
        window.location = "/buzz";
      }
    });
  }

  getLeagueInfo() {
    apiGetRequest(
      `/api/leagues/info/${this.props.leagueId}`,
      "GET",
      this.setLeagueInfo
    );
  }

  setLeagueInfo(response) {
    response.json().then(leagueInfo => {
      if (response.ok) {
        this.setState({ leagueInfo });
      } else {
        window.location = "/buzz";
      }
    });
  }

  render() {
    return (
      <div>
        <Head>
          <title>{`League - ${this.state.leagueInfo.displayName}`}</title>
        </Head>
        <Header />
        <div className="league-subheader">
          <h1>{this.state.leagueInfo.displayName}</h1>
        </div>
        <div className="league">
          <div className="league-inner">
            <LeagueStandings data={this.state.leagueStandings} />
          </div>
        </div>
      </div>
    );
  }
}

export default League;
