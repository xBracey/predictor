import React from "react";
import Head from "next/head";
import HeadInfo from "../components/headInfo";

import LoginSidebar from "../components/loginSidebar";
import LoginWrapper from "../components/loginWrapper";
import ResponsePopup from "../components/responsePopup";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      success: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.forgotPasswordResponse = this.forgotPasswordResponse.bind(this);
    this.onResponseClose = this.onResponseClose.bind(this);
  }

  forgotPasswordResponse(response) {
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

  forgotPassword(email) {
    fetch("api/user/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(this.forgotPasswordResponse);
  }

  handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;

    const error = !email.trim() ? "Email cannot be empty" : null;

    if (!error) {
      this.forgotPassword(email);
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
            <h1> Forgot Password</h1>
            <form onSubmit={this.handleSubmit}>
              <div className="input-wrapper">
                <input type="email" id="email" placeholder="Email" />
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
