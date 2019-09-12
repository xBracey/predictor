import React from "react";
import Link from "next/link";

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

    return <img className="logo" src={logo} />;
  }
  render() {
    return <div className="login-sidebar">{this.renderLogo()}</div>;
  }
}

export default LoginSidebar;
