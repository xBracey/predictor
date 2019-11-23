import React from "react";
import Link from "next/link";
import Head from "next/head";
import DatePicker from "react-datepicker";

import Header from "../../../components/header";
import AdminItems from "../../../components/adminItems";
import "../../../styles/main.css";
import "react-datepicker/dist/react-datepicker.css";

class MatchesEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { id: null, match: null, date: Date.now() };

    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
    this.getMatchSuccessful = this.getMatchSuccessful.bind(this);
    this.getFail = this.getFail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateMatchSuccessful = this.updateMatchSuccessful.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  getMatchSuccessful(result) {
    if (result) {
      const date = new Date(result.date);

      console.log(date);
      this.setState({ match: result, date });
    }
  }

  getFail(response) {
    console.log(response);
  }

  readResponseAsJSON(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw response;
    }
  }

  getMatch(id) {
    fetch(`/api/match/group/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.readResponseAsJSON)
      .then(this.getMatchSuccessful)
      .catch(this.getFail);
  }

  updateMatchSuccessful(result) {
    window.alert("Match Successfully Updated");

    window.history.back();
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

    fetch(`/api/match/group`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
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
      })
    })
      .then(this.readResponseAsJSON)
      .then(this.updateMatchSuccessful)
      .catch(this.getFail);
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
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
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
              <input type="number" id="homeGoals" value={homeGoals} />
              <input type="number" id="awayGoals" value={awayGoals} />
              <input type="submit" value="Save" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MatchesEdit;
