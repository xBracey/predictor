import React from "react";
import Link from "next/link";

class LoginSidebar extends React.Component {
  renderLogo() {
    return <img className="logo" src="static/footyBee.svg" />;
  }
  render() {
    return <div className="login-sidebar">{this.renderLogo()}</div>;
  }
}

export default LoginSidebar;
