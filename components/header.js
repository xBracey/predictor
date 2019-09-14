import React from "react";
import Link from "next/link";

class Header extends React.Component {
  constructor(props) {
    super();

    this.state = {
      currentPage: "/",
      menuClicked: false,
      width: 0
    };

    this.menu = [
      {
        text: "Leagues",
        link: "/leagues"
      },
      {
        text: "Predictions",
        link: "/predictions"
      },
      {
        text: "Results",
        link: "/results"
      }
    ];

    this.onMenuClicked = this.onMenuClicked.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentPage: window.location.pathname,
      width: window.innerWidth
    });
  }

  onMenuClicked() {
    this.setState({ menuClicked: !this.state.menuClicked });
  }

  renderMenu() {
    const menuComponent = this.menu.map(singleMenu => {
      const extraStyling =
        this.state.currentPage === singleMenu.link ? "currentPage" : "";
      return (
        <div className={`singleMenu ${extraStyling}`} key={singleMenu.text}>
          <a href={singleMenu.link}>{singleMenu.text}</a>
        </div>
      );
    });

    const accountImage =
      this.state.width > 900 ? <img src="static/account.svg" /> : null;

    return !this.state.menuClicked && this.state.width < 900 ? null : (
      <div className="menu">
        {menuComponent}
        {accountImage}
      </div>
    );
  }

  renderLogo() {
    const menuSource = this.state.menuClicked
      ? "static/close-menu.svg"
      : "static/menu.svg";

    const menuImage =
      this.state.width > 900 ? null : (
        <img onClick={this.onMenuClicked} src={menuSource} />
      );

    return (
      <div className="logo-container">
        <img className="logo" src="static/footyBee-white.svg" />
        {menuImage}
      </div>
    );
  }

  render() {
    return (
      <header>
        {this.renderLogo()}
        {this.renderMenu()}
      </header>
    );
  }
}

export default Header;
