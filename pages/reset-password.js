import React from "react";
import Head from "next/head";
import HeadInfo from "../components/headInfo";

import LoginSidebar from "../components/loginSidebar";
import LoginWrapper from "../components/loginWrapper";
import ResponsePopup from "../components/responsePopup";

class ForgotPassword extends React.Component {
  static getInitialProps({ query: { token } }) {
    return { token };
  }

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      success: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetPasswordResponse = this.resetPasswordResponse.bind(this);
    this.onResponseClose = this.onResponseClose.bind(this);
  }

  resetPasswordResponse(response) {
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

  resetPassword(password) {
    fetch("api/user/reset-password", {
      method: "POST",
      body: JSON.stringify({ token: this.props.token, password }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(this.resetPasswordResponse);
  }

  handleSubmit(event) {
    event.preventDefault();
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    const error = !password.trim()
      ? "Password cannot be empty"
      : password !== confirmPassword
      ? "Passwords do not match"
      : null;

    if (!error) {
      this.resetPassword(password);
    }

    this.setState({ error });
  }

  render() {
    return (
      <div>
        <Head>
          <title>Home</title>
        </Head>
        <HeadInfo />
        <div className="container">
          <LoginSidebar />
          <LoginWrapper bottomLink="/" bottomText="Back to Login Page">
            <h1> Reset Password</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="input-wrapper">
                <input type="password" id="password" placeholder="Password" />
              </div>
              <div className="input-wrapper">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                />
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

export default ForgotPassword;
