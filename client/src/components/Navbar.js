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
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/connexion" className="nav-link">
            Connexion
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/inscription" className="nav-link">
            Inscription
          </Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profil" className="nav-link">
            Mon profil
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/ajoutAnnonce" className="nav-link">
            Ajout annonce
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" onClick={this.logOut.bind(this)} className="nav-link">
            Déconnexion
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample10"
          aria-controls="navbarsExample10"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="collapse navbar-collapse justify-content-md-center"
          id="navbarsExample10"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <img className="LogoAccueil" src={Logo} alt="StockShop" />
              </Link>
            </li>
          </ul>
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    );
  }
}

export default withRouter(Landing);
