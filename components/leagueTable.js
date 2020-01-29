import React from "react";

class LeagueTable extends React.Component {
  constructor(props) {
    super(props);
  }

  renderHeader() {
    return (
      <div className="table-header">
        <div className="column team">Team</div>
        <div className="column">GF</div>
        <div className="column">GA</div>
        <div className="column">GD</div>
        <div className="column">Pts</div>
      </div>
    );
  }

  renderRows() {
    let gd = 0;

    return this.props.data.map(row => {
      gd = row.goalsFor - row.goalsAgainst;
      return (
        <div className="table-row" key={row.name}>
          <div className="column team">{row.name}</div>
          <div className="column">{row.goalsFor}</div>
          <div className="column">{row.goalsAgainst}</div>
          <div className="column">{gd}</div>
          <div className="column">{row.points}</div>
        </div>
      );
    });
  }

  render() {
    const light = this.props.light ? "light" : "";

    return (
      <div className={`league-table ${light}`}>
        {this.renderHeader()}
        {this.renderRows()}
      </div>
    );
  }
}

export default LeagueTable;
