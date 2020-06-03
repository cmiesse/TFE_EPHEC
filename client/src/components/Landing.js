import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getToken } from "../Utils/Common";
import "../App.css";

class Landing extends Component {
  logOut(e) {
    e.preventDefault();
    this.setState({ Admin: 0 });
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }

  render() {
    const notConnectedLinks = (
      <div>
        <Link to={"/inscription"}>
          <button type="button" className="btn btn-lg btn-primary">
            Pas encore membre ?
          </button>
        </Link>
        <br />
        <br />
        <Link to={"/connexion"}>
          <button type="button" className="btn btn-lg btn-primary">
            Déjà membre ?
          </button>
        </Link>
      </div>
    );
    const connectedLinks = (
      <div>
        <Link to={"/rechercheAnnonces"}>
          <button type="button" className="btn btn-lg btn-primary">
            Recherche d'annonces
          </button>
        </Link>
        <br />
        <br />
        <Link to={"/ajoutAnnonce"}>
          <button type="button" className="btn btn-lg btn-primary">
            Ajout d'annonce
          </button>
        </Link>
        <br />
        <br />
        <Link to={"/profil"}>
          <button type="button" className="btn btn-lg btn-primary">
            Mon profil
          </button>
        </Link>
        <br />
        <br />
        <Link to="/" onClick={this.logOut.bind(this)}>
          <button type="button" className="btn btn-lg btn-primary">
            Se déconnecter
          </button>
        </Link>
      </div>
    );
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <Helmet>
            <title>Accueil - StockShop</title>
          </Helmet>
          {getToken() ? connectedLinks : notConnectedLinks}
        </div>
      </div>
    );
  }
}

export default Landing;
