import React from "react";
import LeagueStandings from "./leagueStandings";

class LeagueStandingsSmall extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a
        className="league-standings-small"
        href={`/league/${this.props.leagueName}`}
      >
        <div className="info">
          <h2>{this.props.displayName}</h2>
          <img src="/static/link.svg" />
        </div>
        <LeagueStandings data={this.props.standings} small={true} />
      </a>
    );
  }
}

export default LeagueStandingsSmall;
