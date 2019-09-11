import React from "react";
import Link from "next/link";
import Head from "next/head";
import "../styles/main.css";

class Buzz extends React.Component {
  constructor(props) {
    super(props);
    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
    this.loginSuccessful = this.loginSuccessful.bind(this);
    this.loginfail = this.loginfail.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  loginSuccessful(result) {
    console.log(result);
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
    return (
      <div>
        <Head>
          <title>Buzz</title>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
        </Head>
        <p>Welcome, you are now logged in</p>
      </div>
    );
  }
}

export default Buzz;
