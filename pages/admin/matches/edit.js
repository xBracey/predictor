import React from "react";
import Link from "next/link";
import Head from "next/head";
import DatePicker from "react-datepicker";

import Header from "../../../components/header";
import AdminItems from "../../../components/adminItems";
import "react-datepicker/dist/react-datepicker.css";
import { apiGetRequest, apiPostRequest } from "../../../lib/api";

class MatchesEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { id: null, match: null, date: Date.now() };

    this.getMatchSuccessful = this.getMatchSuccessful.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateMatchSuccessful = this.updateMatchSuccessful.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.onHomeGoalsChange = this.onHomeGoalsChange.bind(this);
    this.onAwayGoalsChange = this.onAwayGoalsChange.bind(this);
  }

  onHomeGoalsChange(event) {
    const match = { ...this.state.match };
    match.homeGoals = event.target.value;

    this.setState({ match });
  }

  onAwayGoalsChange(event) {
    const match = { ...this.state.match };
    match.awayGoals = event.target.value;

    this.setState({ match });
  }

  getMatchSuccessful(response) {
    if (response.ok) {
      response.json().then(result => {
        if (result) {
          const date = new Date(result.date);
          this.setState({ match: result, date });
        }
      });
    }
  }

  getMatch(id) {
    apiGetRequest(`/api/match/group/${id}`, "GET", this.getMatchSuccessful);
  }

  updateMatchSuccessful(response) {
    if (response.ok) {
      window.alert("Match Successfully Updated");
      window.history.back();
    }
  }

  handleDateChange(date) {
    this.setState({ date });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { id, homeTeamName, awayTeamName, groupNumber } = this.state.match;
    const homeGoals = event.target.homeGoals.value
      ? event.target.homeGoals.value
      : null;
    const awayGoals = event.target.awayGoals.value
      ? event.target.awayGoals.value
      : null;
    const date = event.target.date.value;

    apiPostRequest(`/api/match/group/`, "PUT", this.updateMatchSuccessful, {
      id,
      homeTeamName,
      awayTeamName,
      groupNumber,
      homeGoals,
      awayGoals,
      date: new Date(
        date
          .split("/")
          .reverse()
          .join("/")
      )
    });
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has("id")) {
      const id = searchParams.get("id");
      this.setState({ id });

      this.getMatch(id);
    }
  }

  render() {
    const homeGoals = this.state.match ? this.state.match.homeGoals : "";
    const awayGoals = this.state.match ? this.state.match.awayGoals : "";
    const homeTeamName = this.state.match ? this.state.match.homeTeamName : "";
    const awayTeamName = this.state.match ? this.state.match.awayTeamName : "";
    const groupNumber = this.state.match ? this.state.match.groupNumber : "";

    return (
      <div>
        <Head>
          <title>Admin</title>
        </Head>
        <Header isAdmin={false} admin={true} />
        <div className="page-outer-container">
          <div className="page-inner-container add-edit-container">
            <h1>
              {`${homeTeamName} vs ${awayTeamName} - Group ${groupNumber}`}
            </h1>
            <form onSubmit={this.handleSubmit}>
              <DatePicker
                id="date"
                selected={this.state.date}
                dateFormat="dd/MM/yyyy"
                onChange={this.handleDateChange}
              />
              <input
                onChange={this.onHomeGoalsChange}
                type="number"
                id="homeGoals"
                value={homeGoals}
              />
              <input
                onChange={this.onAwayGoalsChange}
                type="number"
                id="awayGoals"
                value={awayGoals}
              />
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchesEdit;
