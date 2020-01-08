import React from "react";
import Link from "next/link";
import Head from "next/head";

import LoginSidebar from "../components/loginSidebar";
import LoginWrapper from "../components/loginWrapper";
import "../styles/main.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        username: null,
        password: null
      },
      registerSuccessful: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
    this.loginSuccessful = this.loginSuccessful.bind(this);
    this.loginfail = this.loginfail.bind(this);
  }

  loginSuccessful(result) {
    window.location = "/";
  }

  loginfail(response) {
    console.log(response);
  }

  readResponseAsJSON(response) {
    if (response.ok) {
      return response;
    } else {
      throw response;
    }
  }

  register(username, password, name, email) {
    fetch("api/user/register", {
      method: "POST",
      body: JSON.stringify({ username, password, name, email }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.readResponseAsJSON)
      .then(this.loginSuccessful)
      .catch(this.loginfail);
  }

  handleError(name, value) {
    if (value === "empty") {
      return <p className="error">{`${name} cannot be empty`}</p>;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    const email = event.target.email.value;

    const errors = { ...this.state.errors };

    errors.username = !username.trim() ? "empty" : null;
    errors.password = !password.trim() ? "empty" : null;

    if (Object.values(errors).every(error => error == null)) {
      this.register(username, password, name, email);
    }

    this.setState({ errors });
  }

  render() {
    const usernameError = this.handleError(
      "Username",
      this.state.errors.username
    );
    const passwordError = this.handleError(
      "Password",
      this.state.errors.password
    );

    return (
      <div>
        <Head>
          <title>Home</title>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto"
            rel="stylesheet"
          />
        </Head>
        <div className="container">
          <LoginSidebar />
          <LoginWrapper bottomLink="/" bottomText="Back to Login Page">
            <h1> Register </h1>
            <form onSubmit={this.handleSubmit}>
              <div className="input-wrapper">
                <input type="text" id="name" placeholder="Name" />
              </div>
              <div className="input-wrapper">
                <input type="text" id="username" placeholder="Username" />
              </div>
              <div className="input-wrapper">
                <input type="text" id="email" placeholder="Email" />
              </div>
              <div className="input-wrapper">
                <input type="password" id="password" placeholder="Password" />
              </div>
              <input type="submit" value="Register" />
            </form>
          </LoginWrapper>
        </div>
      </div>
    );
  }
}

export default Register;
