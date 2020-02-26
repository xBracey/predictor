import React from "react";

class ResponsePopup extends React.Component {
  constructor(props) {
    super(props);
  }

  convertMessage(rawMessage) {
    if (typeof rawMessage === "string") {
      return <p>{rawMessage}</p>;
    } else {
      return rawMessage.map(line => <p key={line}>{line}</p>);
    }
  }

  renderError(message) {
    return (
      <div className="error">
        <img src="/static/error.svg" />
        <div>{message}</div>
      </div>
    );
  }

  renderSuccess(message) {
    return (
      <div className="success">
        <img src="/static/confirm.svg" />
        <div>{message}</div>
      </div>
    );
  }

  render() {
    if (!this.props.error && !this.props.success) {
      return null;
    }

    const rawMessage = this.props.error ? this.props.error : this.props.success;

    const message = this.convertMessage(rawMessage);

    const renderMethod = this.props.error
      ? this.renderError(message)
      : this.renderSuccess(message);

    return (
      <div onClick={this.props.onClose} className="response-popup-outer">
        <div className="response-popup-inner">{renderMethod}</div>
      </div>
    );
  }
}

export default ResponsePopup;
