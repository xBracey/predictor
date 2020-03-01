import React from "react";
import Head from "next/head";
import HeadInfo from "../components/headInfo";

import LoginSidebar from "../components/loginSidebar";
import LoginWrapper from "../components/loginWrapper";
import ResponsePopup from "../components/responsePopup";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      success: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginResponse = this.loginResponse.bind(this);
    this.onResponseClose = this.onResponseClose.bind(this);
  }

  loginResponse(response) {
    response.json().then(responseJson => {
      if (response.ok) {
        window.localStorage.removeItem("token");
        window.localStorage.setItem("token", responseJson.token);
        window.location = "/";
      } else {
        this.setState({ error: responseJson.error });
      }
    });
  }

  onResponseClose() {
    this.setState({ error: null, success: null });
  }

  login(username, password) {
    fetch("api/user/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(this.loginResponse);
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

    const error = !username.trim()
      ? "Username cannot be empty"
      : !password.trim()
      ? "Password cannot be empty"
      : null;

    if (!error) {
      this.login(username, password);
    }

    this.setState({ error });
  }

  render() {
    return (
      <div>
        <Head>
          <title>Login</title>
        </Head>
        <HeadInfo />
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
                  type="text"
                  id="username"
                  placeholder="Username or Email"
                />
              </div>
              <div className="input-wrapper">
                <input type="password" id="password" placeholder="Password" />
              </div>
              <input type="submit" value="Login" />
            </form>
            <div className="break" />
            <a href="/forgot-password"> Forgotten Password? </a>
          </LoginWrapper>
          <ResponsePopup
            onClose={this.onResponseClose}
            error={this.state.error}
            success={this.state.success}
          />
        </div>
      </div>
    );
  }
}

export default Home;
