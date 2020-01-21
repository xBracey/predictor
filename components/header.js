import React from "react";

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

    this.readResponseAsJSON = this.readResponseAsJSON.bind(this);
    this.loginSuccessful = this.loginSuccessful.bind(this);
    this.loginfail = this.loginfail.bind(this);

    this.onMenuClicked = this.onMenuClicked.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentPage: window.location.pathname,
      width: window.innerWidth
    });
    this.getUser();
  }

  loginSuccessful(result) {
    this.setState({ user: result });
  }

  loginfail(response) {
    console.log(response);
  }

  readResponseAsJSON(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw response;
    }
  }

  getUser() {
    fetch("api/user/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(this.readResponseAsJSON)
      .then(this.loginSuccessful)
      .catch(this.loginfail);
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

    const adminMenu =
      this.state.user && this.state.user.admin ? (
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
      <header>
        <div className="header-container">
          {this.renderLogo()}
          {this.renderMenu()}
        </div>
      </header>
    );
  }
}

export default Header;
