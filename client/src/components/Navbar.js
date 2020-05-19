import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      Admin: "",
    };
  }

  logOut(e) {
    e.preventDefault();
    this.setState({ Admin: 0 });
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }

  componentDidMount() {
    if (localStorage.usertoken) {
      const decoded = jwt_decode(localStorage.usertoken);
      this.setState({ Admin: decoded.Admin });
    }
    setTimeout(() => {
      console.log(this.state.Admin);
    }, 1);
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Connexion
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Inscription
          </Link>
        </li>
      </ul>
    );

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Mon compte
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/newAnnonce" className="nav-link">
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

    /* const userAdminLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Mon compte
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/newAnnonce" className="nav-link">
            Ajout annonce
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin" className="nav-link">
            Admin
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" onClick={this.logOut.bind(this)} className="nav-link">
            Déconnexion
          </Link>
        </li>
      </ul>
    );*/

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
                Accueil
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
