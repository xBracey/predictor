import React from "react";
import HeadInfo from "./headInfo";
import { apiGetRequest } from "../lib/api";

class Header extends React.Component {
  constructor(props) {
    super();

    this.state = {
      currentPage: "/",
      menuClicked: false,
      user: null,
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

    this.readUserResponse = this.readUserResponse.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onMenuClicked = this.onMenuClicked.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentPage: window.location.pathname,
      width: window.innerWidth
    });
    this.getUser();
  }

  readUserResponse(response) {
    response.json().then(user => {
      this.setState({ user });
    });
  }

  getUser() {
    apiGetRequest("/api/user/me", "GET", this.readUserResponse);
  }

  onMenuClicked() {
    this.setState({ menuClicked: !this.state.menuClicked });
  }

  onLogout() {
    localStorage.removeItem("token");
    window.location.href = "/logout";
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

    const adminMenu =
      this.state.user && this.state.user.admin && !this.props.admin ? (
        <div className="singleMenu" key={"Admin"}>
          <a href="/admin/matches">Admin</a>
        </div>
      ) : null;

    const accountImage =
      this.state.width > 1200 ? (
        <div className="logout" onClick={this.onLogout}>
          <img src="/static/account.svg" />
        </div>
      ) : null;

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
      <header>
        <HeadInfo />
        <div className="header-container">
          {this.renderLogo()}
          {this.renderMenu()}
        </div>
      </header>
    );
  }
}

export default Header;
