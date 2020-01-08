import React from "react";
import Link from "next/link";

class LoginWrapper extends React.Component {
  renderContent() {
    return <div className="login-content">{this.props.children}</div>;
  }
  renderContainer() {
    return (
      <div className="login-container">
        {this.renderContent()}
        {this.renderBottom()}
      </div>
    );
  }
  renderBottom() {
    return (
      <div className="bottom">
        <a href={this.props.bottomLink}>
          <p>{this.props.bottomText}</p>
        </a>
      </div>
    );
  }
  render() {
    return <div className="login-main">{this.renderContainer()}</div>;
  }
}

export default LoginWrapper;
