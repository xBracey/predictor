import React from "react";
import Head from "next/head";
import HeadInfo from "../components/headInfo";

import LoginSidebar from "../components/loginSidebar";
import LoginWrapper from "../components/loginWrapper";

class Verify extends React.Component {
  static getInitialProps({ query: { token } }) {
    return { token };
  }

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      success: null
    };

    this.verifyResponse = this.verifyResponse.bind(this);
  }

  componentDidMount() {
    fetch("api/user/email-verify", {
      method: "POST",
      body: JSON.stringify({ token: this.props.token }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(this.verifyResponse);
  }

  verifyResponse(response) {
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
            <h1> Verify Email </h1>
            <h3>{this.state.error ? this.state.error : this.state.success}</h3>
          </LoginWrapper>
        </div>
      </div>
    );
  }
}

export default Verify;
