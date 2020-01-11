import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../../../components/header";
import AdminItems from "../../../components/adminItems";

const groupFields = ["number"];
const idField = "number";

class Groups extends React.Component {
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
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
          <link href="/static/main.css" rel="stylesheet" />
        </Head>
        <Header isAdmin={false} admin={true} />
        <div className="page-outer-container">
          <div className="page-inner-container">
            <AdminItems
              apiPrefix={"groups"}
              fields={groupFields}
              idField={idField}
              noEdit={true}
              sortField={idField}
            />
            <div onClick={this.onAdd} className="addItem">
              Add Group
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Groups;
