import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../components/header";

class Buzz extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Head>
          <title>Buzz</title>
        </Head>
        <Header />
        <div className="subheader">{"Welcome"}</div>
      </div>
    );
  }
}

export default Buzz;
