import React from "react";
import Link from "next/link";
import Head from "next/head";
import LoginSidebar from "../components/loginSidebar";
import LoginWrapper from "../components/loginWrapper";
import "../styles/main.css";

class Register extends React.Component {
  render() {
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
              <input type="text" id="username" placeholder="Username" />
              <input type="text" id="email" placeholder="Email" />
              <input type="password" id="password" placeholder="Password" />
              <input type="submit" value="Register" />
            </form>
          </LoginWrapper>
        </div>
      </div>
    );
  }
}

export default Register;
