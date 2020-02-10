import React from "react";

class LeagueStandings extends React.Component {
  constructor(props) {
    super(props);
  }

  getNumberWithOrdinal(n) {
    var s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  renderRows() {
    return this.props.data.map((user, index) => {
      const userClass = user.isUser ? "user" : "";

      return (
        <div className={`table-row ${userClass}`} key={user.username}>
          <div className="column">{this.getNumberWithOrdinal(index + 1)}</div>
          <div className="column">{user.username}</div>
          <div className="column">{user.points}</div>
        </div>
      );
    });
  }

  render() {
    return <div className="league-standings">{this.renderRows()}</div>;
  }
}

export default LeagueStandings;
