import React from "react";
import Link from "next/link";

class Footer extends React.Component {
  constructor(props) {
    super();

    this.leftMenu = [
      {
        text: "About",
        link: "/about"
      },
      {
        text: "Leaderboard",
        link: "/leaderboard"
      },
      {
        text: "Contact",
        link: "/contact"
      }
    ];

    this.rightMenu = [
      {
        text: "Terms and Conditions",
        link: "/terms"
      },
      {
        text: "Privacy Policy",
        link: "/privacy"
      }
    ];
  }

  renderMenu(menu) {
    const menuComponent = menu.map(singleMenu => {
      return (
        <a className="single-menu" href={singleMenu.link}>
          {singleMenu.text}
        </a>
      );
    });

    return <div className="footer-menu-container">{menuComponent} </div>;
  }

  render() {
    return (
      <div className="page-outer-container footer-outer-container">
        <footer className="page-inner-container">
          {this.renderMenu(this.leftMenu)}
          {this.renderMenu(this.rightMenu)}
        </footer>
      </div>
    );
  }
}

export default Footer;
