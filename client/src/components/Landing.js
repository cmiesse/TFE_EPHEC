import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../App.css";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      UtilisateurID: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getUser() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      UtilisateurID: decoded.UtilisateurID,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <h1>Page d'accueil</h1>
          <Link to={"/annoncesCodePostal"}>Recherche par code postal</Link>
          <br />
          <Link to={"/annoncesVille"}>Recherche par ville</Link>
          <br />
          <Link to={"/annoncesProvince"}>Recherche par province</Link>
          <br />
          <Link to={"/annoncesMagasin"}>Recherche par magasin</Link>
          <br />
        </div>
      </div>
    );
  }
}

export default Landing;
