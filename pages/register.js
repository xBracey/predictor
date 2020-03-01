import React from "react";
import Head from "next/head";
import HeadInfo from "../components/headInfo";

import LoginSidebar from "../components/loginSidebar";
import LoginWrapper from "../components/loginWrapper";
import ResponsePopup from "../components/responsePopup";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      success: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.registerResponse = this.registerResponse.bind(this);
    this.onResponseClose = this.onResponseClose.bind(this);
  }

  registerResponse(response) {
    response.json().then(responseJson => {
      if (response.ok) {
        this.setState({
          success: responseJson.success
        });
      } else {
        this.setState({ error: responseJson.error });
      }
    });
  }

  onResponseClose() {
    this.setState({ error: null, success: null });
    if (this.state.success) {
      window.location = "/";
    }
  }

  register(username, password, name, email) {
    fetch("api/user/register", {
      method: "POST",
      body: JSON.stringify({ username, password, name, email }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(this.registerResponse);
  }

  handleSubmit(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const name = event.target.name.value;
    const email = event.target.email.value;

    const error = !name.trim()
      ? "Name cannot be empty"
      : !username.trim()
      ? "Username cannot be empty"
      : !email.trim()
      ? "Email cannot be empty"
      : !password.trim()
      ? "Password cannot be empty"
      : password !== confirmPassword
      ? "Passwords do not match"
      : null;

    if (!error) {
      this.register(username, password, name, email);
    }

    this.setState({ error });
  }

  render() {
    return (
      <div>
        <Head>
          <title>Register</title>
        </Head>
        <HeadInfo />
        <div className="container">
          <LoginSidebar />
          <LoginWrapper bottomLink="/" bottomText="Back to Login Page">
            <h1> Register</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="input-wrapper half">
                <input type="text" id="name" placeholder="Name" />
              </div>
              <div className="input-wrapper half">
                <input type="text" id="username" placeholder="Username" />
              </div>
              <div className="input-wrapper">
                <input type="email" id="email" placeholder="Email" />
              </div>
              <div className="input-wrapper half">
                <input type="password" id="password" placeholder="Password" />
              </div>
              <div className="input-wrapper half">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
              <div className="input-wrapper terms-and-conditions">
                <label>
                  <input type="checkbox" required />
                  <span></span>I agree to the
                  <a href="/terms-and-conditions" target="_blank">
                    terms and conditions
                  </a>
                </label>
              </div>
              <input type="submit" value="Register" />
            </form>
          </LoginWrapper>
        </div>
        <ResponsePopup
          onClose={this.onResponseClose}
          error={this.state.error}
          success={this.state.success}
        />
      </div>
    );
  }
}

export default Register;
