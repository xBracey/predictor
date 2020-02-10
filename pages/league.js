import React from "react";
import Head from "next/head";

import Header from "../components/header";

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
    fetch(`/api/leagues/standings/${this.props.leagueId}`, {
      method: "GET"
    }).then(this.setStandings);
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
    fetch(`/api/leagues/info/${this.props.leagueId}`, {
      method: "GET"
    }).then(this.setLeagueInfo);
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
    console.log(this.state);
    return (
      <div>
        <Head>
          <title>League</title>
        </Head>
        <Header />
        <div className="subheader">{"Welcome"}</div>
      </div>
    );
  }
}

export default League;
