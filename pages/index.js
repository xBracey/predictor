import React from "react";
import Link from "next/link";
import Head from "next/head";
import LoginSidebar from "../components/loginSidebar";
import LoginWrapper from "../components/loginWrapper";
import "../styles/main.css";

const Home = () => (
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
        <input type="text" id="email" placeholder="Email" />
        <input type="password" id="password" placeholder="Password" />
        <div className="break" />
        <a href="/forgot-password"> Forgotten Password? </a>
      </LoginWrapper>
    </div>
  </div>
);

export default Home;
