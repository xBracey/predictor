import React from "react";
import Head from "next/head";

import Header from "../components/header";
import LeagueTable from "../components/leagueTable";
import LeaguePrediction from "../components/leaguePrediction";
import { groupStandings } from "../lib/group";
import ResponsePopup from "../components/responsePopup";
import { apiGetRequest, apiPostRequest } from "../lib/api";

const groups = ["A", "B", "C", "D", "E", "F"];

class Predictions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      groupMatches: {},
      error: null,
      success: null
    };

    this.setResults = this.setResults.bind(this);
    this.onResultChange = this.onResultChange.bind(this);
    this.predictionResponse = this.predictionResponse.bind(this);
    this.onResponseClose = this.onResponseClose.bind(this);
  }

  componentDidMount() {
    this.getResults();
  }

  onResultChange(homeGoals, awayGoals, groupNumber, id) {
    const { groupMatches } = this.state;

    const newGroupMatches = { ...groupMatches };
    const newGroupMatchesChanged = [...groupMatches[groupNumber]];
    const oldGroupMatchIndex = newGroupMatchesChanged.findIndex(
      match => match.id === id
    );
    newGroupMatchesChanged[oldGroupMatchIndex].homeGoals = homeGoals;
    newGroupMatchesChanged[oldGroupMatchIndex].awayGoals = awayGoals;

    newGroupMatches[groupNumber] = newGroupMatchesChanged;

    this.setState({
      groupMatches: newGroupMatches
    });
  }

  getResults() {
    apiGetRequest("api/predictions/group", "GET", this.setResults);
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

  onResponseClose() {
    this.setState({ error: null, success: null });
  }

  predictionResponse(response) {
    if (response.ok) {
      this.setState({
        success: "Prediction successfully made"
      });
    }
  }

  submitPredictions(groupNumber) {
    const predictions = [...this.state.groupMatches[groupNumber]];

    predictions.forEach(prediction => {
      if (prediction.homeGoals === "" || prediction.awayGoals === "") {
        prediction.homeGoals = null;
        prediction.awayGoals = null;
      }
      prediction.groupMatchId = prediction.id;
    });

    apiPostRequest("api/predictions/group", "POST", this.predictionResponse, {
      predictions
    });
  }

  renderResults(matches, light) {
    return matches.map(match => (
      <LeaguePrediction
        key={match.id}
        match={match}
        homeTeam={match.homeTeamName}
        awayTeam={match.awayTeamName}
        homeGoals={match.homeGoals}
        awayGoals={match.awayGoals}
        light={light}
        onResultChange={this.onResultChange}
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
              <div
                className="submit-predictions"
                onClick={() => {
                  this.submitPredictions(groupNumber);
                }}
              >
                Submit Predictions
              </div>
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
          <title>Predictions</title>
        </Head>
        <Header />
        {this.renderGroups()}
        <ResponsePopup
          onClose={this.onResponseClose}
          error={this.state.error}
          success={this.state.success}
        />
      </div>
    );
  }
}

export default Predictions;
