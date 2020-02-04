import React from "react";
import Head from "next/head";

import Header from "../components/header";
import LeagueTable from "../components/leagueTable";
import LeagueResult from "../components/leagueResult";
import { groupStandings } from "../lib/group";

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

  renderGroup(matches, light) {
    let groupTeamsItems = [];
    matches.forEach(match => {
      groupTeamsItems.push(match.homeTeamName);
      groupTeamsItems.push(match.awayTeamName);
    });

    let groupTeams = Array.from(new Set(groupTeamsItems));

    const sortedGroupTeams = groupStandings(groupTeams, matches);

    return <LeagueTable data={sortedGroupTeams} light={light} />;
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
          <div className={`results ${colour}`} key={groupNumber}>
            <div className="inner-container">
              <h2>{`Group ${groupNumber}:`}</h2>
              <div className="league-results">
                {this.renderResults(matches, light)}
              </div>
              {this.renderGroup(matches, light)}
            </div>
          </div>
        );
      }
    );
  }

  render() {
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
