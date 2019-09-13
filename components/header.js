import React from "react";
import Link from "next/link";

class Header extends React.Component {
  constructor(props) {
    super();

    this.state = {
      currentPage: "/"
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
  }

  componentDidMount() {
    this.setState({
      currentPage: window.location.pathname
    });
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

    return (
      <div className="menu">
        {menuComponent}
        <img src="static/account.svg" />
      </div>
    );
  }

  renderLogo() {
    return <img className="logo" src="static/footyBee-white.svg" />;
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
