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

    this.adminMenu = [
      {
        text: "Matches",
        link: "/admin/matches"
      },
      {
        text: "Players",
        link: "/admin/players"
      },
      {
        text: "Teams",
        link: "/admin/teams"
      },
      {
        text: "Groups",
        link: "/admin/groups"
      }
    ];

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
    const menu = this.props.admin ? this.adminMenu : this.menu;

    const menuComponent = menu.map(singleMenu => {
      const extraStyling =
        this.state.currentPage === singleMenu.link ? "currentPage" : "";
      return (
        <div className={`singleMenu ${extraStyling}`} key={singleMenu.text}>
          <a href={singleMenu.link}>{singleMenu.text}</a>
        </div>
      );
    });

    const adminMenu = this.props.isAdmin ? (
      <div className="singleMenu" key={"Admin"}>
        <a href="/admin/players">Admin</a>
      </div>
    ) : null;

    const accountImage =
      this.state.width > 1200 ? <img src="/static/account.svg" /> : null;

    return !this.state.menuClicked && this.state.width < 1200 ? null : (
      <div className="menu">
        {adminMenu}
        {menuComponent}
        {accountImage}
      </div>
    );
  }

  renderLogo() {
    const menuSource = this.state.menuClicked
      ? "/static/close-menu.svg"
      : "/static/menu.svg";

    const menuImage =
      this.state.width > 1200 ? null : (
        <img onClick={this.onMenuClicked} src={menuSource} />
      );

    return (
      <div className="logo-container">
        <a href="/buzz">
          <img className="logo" src="/static/footyBee-white.svg" />
        </a>
        {menuImage}
      </div>
    );
  }

  render() {
    return (
      <div className="page-outer-container header-outer-container">
        <header className="page-inner-container">
          {this.renderLogo()}
          {this.renderMenu()}
        </header>
      </div>
    );
  }
}

export default Header;
