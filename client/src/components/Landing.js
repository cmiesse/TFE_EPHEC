import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Helmet } from "react-helmet";
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
          <Helmet>
            <title>Accueil - StockShop</title>
          </Helmet>
          <h1>Recherche d'annonces </h1>
          <div className="AnnoncesRecherche">
            <Link to={"/annoncesCodePostal"}>
              <button type="button" className="btn btn-lg btn-primary">
                par code postal
              </button>
            </Link>
            <br />
            <br />
            <Link to={"/annoncesVille"}>
              <button type="button" className="btn btn-lg btn-primary">
                par ville
              </button>
            </Link>
            <br />
            <br />
            <Link to={"/annoncesProvince"}>
              <button type="button" className="btn btn-lg btn-primary">
                par province
              </button>
            </Link>
            <br />
            <br />
            <Link to={"/annoncesMagasin"}>
              <button type="button" className="btn btn-lg btn-primary">
                par magasin
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
