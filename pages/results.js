import React from "react";
import Head from "next/head";

import Header from "../components/header";
import LeagueTable from "../components/leagueTable";
import LeagueResult from "../components/leagueResult";

const data = [
  {
    team: "Norway",
    goalsFor: 2,
    goalsAgainst: 5,
    points: 5
  },
  {
    team: "Germany",
    goalsFor: 2,
    goalsAgainst: 5,
    points: 5
  },
  {
    team: "Czech Republic",
    goalsFor: 2,
    goalsAgainst: 5,
    points: 5
  },
  {
    team: "Croatia",
    goalsFor: 2,
    goalsAgainst: 5,
    points: 5
  }
];

const groups = ["A", "B", "C", "D", "E", "F"];

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = { groupMatches: {} };

    this.setResults = this.setResults.bind(this);
  }

  componentDidMount() {
    this.getResults();
  }

  getResults() {
    fetch("api/match/group", {
      method: "GET"
    }).then(this.setResults);
  }

  setResults(response) {
    const groupMatches = {};

    response.json().then(responseJson => {
      groups.forEach(group => {
        groupMatches[group] = responseJson.filter(
          match => match.groupNumber === group
        );
      });

      this.setState({ groupMatches });
    });
  }

  renderResults(matches, light) {
    return matches.map(match => (
      <LeagueResult
        key={match.id}
        homeTeam={match.homeTeamName}
        awayTeam={match.awayTeamName}
        homeGoals={match.homeGoals}
        awayGoals={match.awayGoals}
        light={light}
      />
    ));
  }

  renderGroups() {
    let groupCounter = 0;
    let colour = "dark";
    let light = false;

    return Object.entries(this.state.groupMatches).map(
      ([groupNumber, matches]) => {
        groupCounter += 1;
        colour = groupCounter % 2 === 1 ? "dark" : "light";
        light = groupCounter % 2 === 1 ? false : true;

        return (
          <div className={`results ${colour}`}>
            <div className="inner-container">
              <h2>{`Group ${groupNumber}:`}</h2>
              <div className="league-results">
                {this.renderResults(matches, light)}
              </div>
            </div>
          </div>
        );
      }
    );
  }

  render() {
    console.log(this.state.groupMatches);

    return (
      <div>
        <Head>
          <title>Results</title>
        </Head>
        <Header />
        {this.renderGroups()}
      </div>
    );
  }
}

export default Results;
