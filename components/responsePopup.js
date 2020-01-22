import React from "react";

class ResponsePopup extends React.Component {
  constructor(props) {
    super(props);
  }

  renderError() {
    return <div className="error">{this.props.error}</div>;
  }

  renderSuccess() {
    return <div className="success">{this.props.success}</div>;
  }

  render() {
    if (!this.props.error && !this.props.success) {
      return null;
    }

    const renderMethod = this.props.error
      ? this.renderError()
      : this.renderSuccess();

    return (
      <div onClick={this.props.onClose} className="response-popup-outer">
        <div className="response-popup-inner">{renderMethod}</div>
      </div>
    );
  }
}

export default ResponsePopup;
