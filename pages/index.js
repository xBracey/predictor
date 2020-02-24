import React from "react";
import Head from "next/head";

import Header from "../components/header";
import LeagueResult from "../components/leagueResult";
import AllLeagues from "../components/allLeagues";
import { apiGetRequest } from "../lib/api";

class Buzz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todayMatches: [],
      username: ""
    };

    this.setTodaysMatches = this.setTodaysMatches.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  componentDidMount() {
    this.getTodaysMatches();
    this.getUsername();
  }

  getUsername() {
    apiGetRequest("api/user/me", "GET", this.setUsername);
  }

  setUsername(response) {
    response.json().then(user => {
      if (user.error) {
        window.location = "/login";
      }
      this.setState({ username: user.username });
    });
  }

  getTodaysMatches() {
    apiGetRequest("api/match/today", "GET", this.setTodaysMatches);
  }

  setTodaysMatches(response) {
    response.json().then(todayMatches => {
      if (todayMatches.error) {
        window.location = "/login";
      }
      this.setState({ todayMatches });
    });
  }

  renderResults() {
    return this.state.todayMatches.map(match => (
      <LeagueResult
        key={match.id}
        homeTeam={match.homeTeamName}
        awayTeam={match.awayTeamName}
        homeGoals={match.homeGoals}
        awayGoals={match.awayGoals}
        light={false}
      />
    ));
  }

  renderTodayMatches() {
    return (
      <div className="results">
        <div className="inner-container">
          <h2>{`Welcome ${this.state.username}, here are today's matches:`}</h2>
          <div className="league-results">{this.renderResults()}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Head>
          <title>Buzz</title>
        </Head>
        <Header />
        <div className="subheader">{this.renderTodayMatches()}</div>
        <AllLeagues />
      </div>
    );
  }
}

export default Buzz;
