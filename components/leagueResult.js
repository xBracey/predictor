import React from "react";

class LeagueResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { homeTeam, awayTeam, homeGoals, awayGoals, light } = this.props;

    const homeTeamImage = homeTeam.replace(/\s+/g, "_");
    const awayTeamImage = awayTeam.replace(/\s+/g, "_");

    const lightClass = light ? "light" : "";

    return (
      <div className={`league-result ${lightClass}`}>
        <img className="flag" src={`/static/flags/${homeTeamImage}.svg`} />
        <p className="team">{homeTeam}</p>
        <p className="score">{homeGoals}</p>
        <p className="dash">-</p>
        <p className="score">{awayGoals}</p>
        <p className="team">{awayTeam}</p>
        <img className="flag" src={`/static/flags/${awayTeamImage}.svg`} />
      </div>
    );
  }
}

export default LeagueResult;
