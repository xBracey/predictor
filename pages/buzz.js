import React from "react";
import Link from "next/link";
import Head from "next/head";

import Header from "../components/header";
import "../styles/main.css";

class Buzz extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };

    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
    this.loginSuccessful = this.loginSuccessful.bind(this);
    this.loginfail = this.loginfail.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  loginSuccessful(result) {
    this.setState({ user: result });
  }

  loginfail(response) {
    console.log(response);
  }

  readResponseAsJSON(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw response;
    }
  }

  getUser() {
    fetch("api/user/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.readResponseAsJSON)
      .then(this.loginSuccessful)
      .catch(this.loginfail);
  }

  render() {
    const welcomeMessage = this.state.user
      ? "Welcome " + this.state.user.username
      : "";

    return (
      <div>
        <Head>
          <title>Buzz</title>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
        </Head>
        <Header />
        <div className="subheader">{welcomeMessage}</div>
      </div>
    );
  }
}

export default Buzz;
