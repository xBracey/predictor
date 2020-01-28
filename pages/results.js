import React from "react";
import Head from "next/head";

import Header from "../components/header";
import LeagueTable from "../components/leagueTable";

const data = [
  {
    team: "Norway",
    goalsFor: 2,
    goalsAgainst: 5,
    points: 5
  },
  {
    team: "Germany",
    goalsFor: 2,
    goalsAgainst: 5,
    points: 5
  },
  {
    team: "Czech Republic",
    goalsFor: 2,
    goalsAgainst: 5,
    points: 5
  },
  {
    team: "Croatia",
    goalsFor: 2,
    goalsAgainst: 5,
    points: 5
  }
];

class Results extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Head>
          <title>Results</title>
        </Head>
        <Header />
        <div className="results">
          <div className="dark">
            <LeagueTable light={false} data={data} />
          </div>
        </div>
      </div>
    );
  }
}

export default Results;
