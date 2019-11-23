import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";
import AdminItems from "../../../components/adminItems";
import "../../../styles/main.css";

const matchFields = ["id", "groupNumber", "homeTeamName", "awayTeamName"];
const idField = "id";
const sortField = "groupNumber";

class Matches extends React.Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd;
    this.onCreate = this.onCreate.bind(this);
    this.createSuccessful = this.createSuccessful.bind(this);
    this.createFail = this.createFail.bind(this);
    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
  }

  onAdd() {
    window.location.href = `${window.location.href}/add`;
  }

  onCreate() {
    fetch(`/api/match/group/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.readResponseAsJSON)
      .then(this.createSuccessful)
      .catch(this.createFail);
  }

  createSuccessful(results) {
    window.location.reload();
  }

  createFail(response) {
    response.json().then(result => {
      window.alert(result.error);
    });
  }

  readResponseAsJSON(response) {
    if (response.ok) {
      return response.json();
    } else {
    }
    throw response;
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
              apiPrefix={"match/group"}
              fields={matchFields}
              idField={idField}
              filterName={"groupNumber"}
              sortField={sortField}
            />
            <div onClick={this.onCreate} className="addItem">
              Create Matches
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Matches;
