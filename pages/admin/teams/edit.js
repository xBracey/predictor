import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";
import AdminItems from "../../../components/adminItems";
import "../../../styles/main.css";

const groupFields = ["number"];
const idField = "number";

class TeamsEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = { id: null };
  }

  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has("id")) {
      this.setState({
        id: decodeURI(searchParams.get("id"))
      });
    }
  }

  render() {
    console.log(this.state.id);
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
          <div className="page-inner-container" />
        </div>
      </div>
    );
  }
}

export default TeamsEdit;
