import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";
import AdminItems from "../../../components/adminItems";
import "../../../styles/main.css";

const playerFields = ["name", "teamName"];
const idField = "name";

class Players extends React.Component {
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
        <div className="page-outer-container">
          <div className="page-inner-container">
            <AdminItems
              apiPrefix={"players"}
              fields={playerFields}
              idField={idField}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Players;
