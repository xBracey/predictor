import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";
import AdminItems from "../../../components/adminItems";

const teamFields = ["name", "groupNumber"];
const idField = "name";

class Teams extends React.Component {
  constructor(props) {
    super(props);

    this.onAdd = this.onAdd;
  }

  onAdd() {
    window.location.href = `${window.location.href}add`;
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
              apiPrefix={"teams"}
              fields={teamFields}
              idField={idField}
              filterName={"groupNumber"}
              sortField={idField}
            />
            <div onClick={this.onAdd} className="addItem">
              Add Team
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Teams;
