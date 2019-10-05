import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../components/header";
import "../../styles/main.css";

class Buzz extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Head>
          <title>Admin</title>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
        </Head>
        <Header isAdmin={false} admin={true} />
      </div>
    );
  }
}

export default Buzz;
