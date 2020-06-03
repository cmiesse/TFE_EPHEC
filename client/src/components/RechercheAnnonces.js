import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../App.css";

class RechercheAnnonces extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <Helmet>
            <title>Recherche d'annonces - StockShop</title>
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
            <br />
            <br />
            <Link to={"/annoncesDenree"}>
              <button type="button" className="btn btn-lg btn-primary">
                par denrée
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default RechercheAnnonces;
