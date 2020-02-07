import React from "react";

class LeaguePrediction extends React.Component {
  constructor(props) {
    super(props);

    const { homeGoals, awayGoals } = props;

    this.state = {
      homeGoals: homeGoals === null ? "" : homeGoals,
      awayGoals: awayGoals === null ? "" : awayGoals
    };

    this.onChangeHome = this.onChangeScore.bind(this, true, null);
    this.onChangeAway = this.onChangeScore.bind(this, false, null);
    this.onIncreaseHome = this.onChangeScore.bind(this, true, true);
    this.onDecreaseHome = this.onChangeScore.bind(this, true, false);
    this.onIncreaseAway = this.onChangeScore.bind(this, false, true);
    this.onDecreaseAway = this.onChangeScore.bind(this, false, false);
  }

  onChangeScore(home, increase, e) {
    let { homeGoals, awayGoals } = this.state;

    if (home) {
      let homeGoalsNew =
        increase === null
          ? e.target.value.replace(/\s+/, "")
          : increase
          ? parseInt(homeGoals + 1)
          : homeGoals == 0
          ? ""
          : homeGoals - 1;

      if (homeGoalsNew > -1 && homeGoalsNew < 20) {
        this.setState({
          homeGoals: homeGoalsNew
        });

        this.props.onResultChange(
          parseInt(homeGoalsNew),
          awayGoals,
          this.props.match.groupNumber,
          this.props.match.id
        );
      }
    } else {
      let awayGoalsNew =
        increase === null
          ? e.target.value.replace(/\s+/, "")
          : increase
          ? parseInt(awayGoals + 1)
          : awayGoals == 0
          ? ""
          : awayGoals - 1;

      if (awayGoalsNew > -1 && awayGoalsNew < 20) {
        this.setState({
          awayGoals: awayGoalsNew
        });

        this.props.onResultChange(
          homeGoals,
          parseInt(awayGoalsNew),
          this.props.match.groupNumber,
          this.props.match.id
        );
      }
    }
  }

  render() {
    const { homeTeam, awayTeam, light } = this.props;
    const { homeGoals, awayGoals } = this.state;

    const homeTeamImage = homeTeam.replace(/\s+/g, "_");
    const awayTeamImage = awayTeam.replace(/\s+/g, "_");

    const lightClass = light ? "light" : "";

    return (
      <div className={`league-result ${lightClass}`}>
        <img className="flag" src={`/static/flags/${homeTeamImage}.svg`} />
        <p className="team">{homeTeam}</p>
        <div className="score-container">
          <div className="arrow" onClick={this.onIncreaseHome}>
            <img src={`/static/drop-up${lightClass}.svg`} />
          </div>
          <input
            type="text"
            className="score"
            value={homeGoals}
            onChange={this.onChangeHome}
          />
          <div className="arrow" onClick={this.onDecreaseHome}>
            <img src={`/static/drop-down${lightClass}.svg`} />
          </div>
        </div>
        <p className="dash">-</p>
        <div className="score-container">
          <div className="arrow" onClick={this.onIncreaseAway}>
            <img src={`/static/drop-up${lightClass}.svg`} />
          </div>
          <input
            type="text"
            className="score"
            value={awayGoals}
            onChange={this.onChangeAway}
          />
          <div className="arrow" onClick={this.onDecreaseAway}>
            <img src={`/static/drop-down${lightClass}.svg`} />
          </div>
        </div>
        <p className="team">{awayTeam}</p>
        <img className="flag" src={`/static/flags/${awayTeamImage}.svg`} />
      </div>
    );
  }
}

export default LeaguePrediction;
