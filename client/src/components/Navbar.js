import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "./signs/Logo.png";

class Landing extends Component {
  constructor() {
    super();
    this.state = {};
  }

  logOut(e) {
    e.preventDefault();
    this.setState({ Admin: 0 });
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark rounded">
        <div className="containerCenter">
          <Link to="/">
            <img className="LogoAccueil" src={Logo} alt="StockShop" />
          </Link>
        </div>
      </nav>
    );
  }
}

export default withRouter(Landing);
