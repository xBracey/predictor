import React from "react";
import Link from "next/link";
import Head from "next/head";
import LoginSidebar from "../components/loginSidebar";
import LoginMain from "../components/loginMain";
import "../styles/main.css";

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>
    <div className="container">
      <LoginSidebar />
      <LoginMain />
    </div>
  </div>
);

export default Home;
