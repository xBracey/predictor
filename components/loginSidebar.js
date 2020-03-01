import React from "react";
import Link from "next/link";

const sidebarInfo = [
  {
    imageSource: "static/scoreboard.svg",
    content:
      "Predict each football score for the upcoming Euro 2020 tournament."
  },
  {
    imageSource: "static/trophy.svg",
    content:
      "Get points for how good your predictions are and compete with your friends in your own league."
  },
  {
    imageSource: "static/customise.svg",
    content:
      "Personalise your own leagues by allowing you to customise how points are distributed."
  }
];

class LoginSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
  }

  componentDidMount() {
    this.setState({ width: window.innerWidth });
  }

  renderLogo() {
    const logo =
      this.state.width < 900
        ? "static/footyBee-white.svg"
        : "static/footyBee.svg";

    return (
      <a href="/login">
        <img className="logo" src={logo} />
      </a>
    );
  }

  renderInformation() {
    const content = sidebarInfo.map(singleContent => (
      <div className="single-content" key={singleContent.imageSource}>
        <img src={singleContent.imageSource} />
        <p>{singleContent.content}</p>
      </div>
    ));

    return <div className="sidebar-info">{content}</div>;
  }

  renderAboutMenu() {
    return (
      <div className="about-menu">
        <a href="/about">About</a>
        <a href="/terms-and-conditions">{"T&Cs"}</a>
        <a href="/privacy-policy">Privacy</a>
      </div>
    );
  }

  render() {
    return (
      <div className="login-sidebar">
        {this.renderLogo()}
        <h1> Euro 2020 Football Predictor </h1>
        {this.renderInformation()}
        {this.renderAboutMenu()}
      </div>
    );
  }
}

export default LoginSidebar;
