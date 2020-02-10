import React from "react";
import LeagueStandings from "./leagueStandings";

class LeagueStandingsSmall extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="league-standings-small">
        <h2>{this.props.displayName}</h2>
        <img src="/static/link.svg" />
        <LeagueStandings data={this.props.data} />
      </div>
    );
  }
}

export default LeagueStandingsSmall;
