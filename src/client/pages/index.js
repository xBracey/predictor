import React from "react";
import Link from "next/link";
import Head from "next/head";

import LoginSidebar from "../components/loginSidebar";
import LoginWrapper from "../components/loginWrapper";
import "../styles/main.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        username: null,
        password: null
      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
    this.loginSuccessful = this.loginSuccessful.bind(this);
    this.loginfail = this.loginfail.bind(this);
  }

  loginSuccessful(result) {
    window.location = "/buzz";
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

  login(username, password) {
    fetch("api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
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
    const errors = { ...this.state.errors };

    errors.username = !username.trim() ? "empty" : null;
    errors.password = !password.trim() ? "empty" : null;

    if (Object.values(errors).every(error => error == null)) {
      this.login(username, password);
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
          <LoginWrapper
            bottomLink="/register"
            bottomText="Don't have an account? Sign Up"
          >
            <h1> Login </h1>
            <form onSubmit={this.handleSubmit}>
              <div className="input-wrapper">
                <input
                  className={this.state.errors.username ? "error" : ""}
                  type="text"
                  id="username"
                  placeholder="Username"
                />
                {usernameError}
              </div>
              <div className="input-wrapper">
                <input
                  className={this.state.errors.password ? "error" : ""}
                  type="password"
                  id="password"
                  placeholder="Password"
                />
                {passwordError}
              </div>
              <input type="submit" value="Login" />
            </form>
            <div className="break" />
            <a href="/forgot-password"> Forgotten Password? </a>
          </LoginWrapper>
        </div>
      </div>
    );
  }
}

export default Home;
