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
    this.validateResponse = this.validateResponse.bind(this);
    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
    this.logResult = this.logResult.bind(this);
    this.logError = this.logError.bind(this);
  }

  logResult(result) {
    console.log(result);
  }

  logError(error) {
    console.log("Looks like there was a problem: \n", error);
  }

  validateResponse(response) {
    if (!response.ok) {
      console.log(response);
    }
    return response;
  }

  readResponseAsJSON(response) {
    return response.json();
  }

  login(username, password) {
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.validateResponse) // 2
      .then(this.readResponseAsJSON) // 3
      .then(this.logResult) // 4
      .catch(this.logError);
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
