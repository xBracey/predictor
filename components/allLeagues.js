import React from "react";
import LeagueStandingsSmall from "./leagueStandingsSmall";

class AllLeagues extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leagues: []
    };

    this.setLeagues = this.setLeagues.bind(this);
  }

  componentDidMount() {
    this.getLeagues();
  }

  getLeagues() {
    fetch("api/leagues", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(this.setLeagues);
  }

  setLeagues(response) {
    response.json().then(leagues => {
      if (response.ok) {
        this.setState({ leagues });
      }
    });
  }

  render() {
    const leaguesComponent = this.state.leagues.map(league => (
      <LeagueStandingsSmall
        displayName={league.info.displayName}
        standings={league.standings}
        leagueName={league.info.leagueName}
      />
    ));

    return (
      <div className="leagues-outer">
        <div className="leagues-inner">{leaguesComponent}</div>
      </div>
    );
  }
}

export default AllLeagues;
