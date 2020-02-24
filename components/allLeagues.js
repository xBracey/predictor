import React from "react";
import LeagueStandingsSmall from "./leagueStandingsSmall";
import { apiGetRequest } from "../lib/api";

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
    apiGetRequest("api/leagues", "GET", this.setLeagues);
  }

  setLeagues(response) {
    response.json().then(leagues => {
      if (response.ok) {
        this.setState({ leagues });
      }
    });
  }

  render() {
    const leaguesComponent = this.state.leagues.map(league => {
      return (
        <LeagueStandingsSmall
          displayName={league.info.info.displayName}
          standings={league.standings}
          leagueName={league.info.info.leagueName}
          key={league.info.info.leagueName}
        />
      );
    });

    return (
      <div className="leagues-outer">
        <div className="leagues-inner">{leaguesComponent}</div>
      </div>
    );
  }
}

export default AllLeagues;
