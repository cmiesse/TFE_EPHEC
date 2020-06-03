import React, { Component } from "react";
import AnnonceDetails from "./AnnonceDetails";
import { Helmet } from "react-helmet";

export default class AnnoncesDenree extends Component {
  constructor() {
    super();
    this.state = {
      Denrees: [],
      AnnoncesDenree: [],
      DenreeID: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getDenrees() {
    fetch(`/api/denrees`)
      .then((res) => res.json())
      .then((res) => this.setState({ Denrees: res.data }))
      .catch((err) => console.log(err));
  }

  getAnnoncesByDenree(id) {
    fetch(`/api/annoncesDenree/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesDenree: res.data }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getDenrees();
  }

  componentDidUpdate() {
    if (this.state.DenreeID !== "") {
      this.getAnnoncesByDenree(this.state.DenreeID);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="col-md-6 mt-3 mx-auto">
              <Helmet>
                <title>Recherche d'annonces par denrée - StockShop</title>
              </Helmet>
              <h1 className="h3 mb-3 font-weight-normal">
                Recherche par denrée
              </h1>
              <div className="form-group">
                <label htmlFor="DenreeID">Denrée</label>
                <select
                  className="form-control"
                  name="DenreeID"
                  id="DenreeID"
                  value={this.state.DenreeID}
                  onChange={this.onChange}
                  required
                >
                  <option value="" defaultValue>
                    --Choix de denrée à effectuer--
                  </option>
                  {this.state.Denrees.map((denree) => (
                    <option key={denree.DenreeNom} value={denree.DenreeID}>
                      {denree.DenreeNom}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                {this.state.AnnoncesDenree.map((annonce) => (
                  <AnnonceDetails
                    denree={annonce.DenreeNom}
                    quantite={annonce.Quantite}
                    magasin={annonce.MagasinNom}
                    date={annonce.JourCreation}
                    minutes={annonce.nombreMinutes}
                    heures={annonce.nombreHeures}
                    key={annonce.AnnonceID}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
