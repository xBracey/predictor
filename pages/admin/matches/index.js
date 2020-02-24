import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";
import AdminItems from "../../../components/adminItems";
import { apiPostRequest } from "../../../lib/api";

const matchFields = ["id", "groupNumber", "homeTeamName", "awayTeamName"];
const idField = "id";
const sortField = "id";

class Matches extends React.Component {
  constructor(props) {
    super(props);

    this.onCreate = this.onCreate.bind(this);
    this.createSuccessful = this.createSuccessful.bind(this);
  }

  onCreate() {
    apiPostRequest(
      `/api/match/group/create`,
      "POST",
      this.createSuccessful,
      {}
    );
  }

  createSuccessful(response) {
    response.json().then(result => {
      if (response.ok) {
        window.location.reload();
      } else {
        window.alert(result.error);
      }
    });
  }

  render() {
    return (
      <div>
        <Head>
          <title>Admin</title>
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
