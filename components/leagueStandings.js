import React from "react";

class LeagueStandings extends React.Component {
  constructor(props) {
    super(props);
  }

  checkUserShouldBeShown(user, index) {
    const userIndex = this.props.data.findIndex(user => user.isUser);
    const userLength = this.props.data.length;

    if (!this.props.small) {
      return true;
    }

    if (Math.abs(index - userIndex) < 3) {
      return true;
    }

    if (
      ((userIndex === 0 || userIndex === 1) && index === 4) ||
      (userIndex === 0 && index === 3)
    ) {
      return true;
    }

    if (
      ((userIndex === userLength - 1 || userIndex === userLength - 2) &&
        index === userLength - 5) ||
      (userIndex === userLength - 1 && index === userLength - 4)
    ) {
      return true;
    }
  }

  getNumberWithOrdinal(n) {
    var s = ["th", "st", "nd", "rd"],
      v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  renderRows() {
    const smallClass = this.props.small ? "small" : "";

    return this.props.data.map((user, index) => {
      if (!this.checkUserShouldBeShown(user, index)) {
        return;
      }

      const userClass = user.isUser ? "user" : "";

      return (
        <div
          className={`table-row ${userClass} ${smallClass}`}
          key={user.username}
        >
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
