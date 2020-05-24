import React, { Component } from "react";
import { Helmet } from "react-helmet";

export default class AnnoncesVille extends Component {
  constructor() {
    super();
    this.state = {
      AnnoncesVille: [],
      VilleNom: "",
      TypeID: "",
      DenreeID: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value !== "") {
      setTimeout(() => {
        this.getAnnoncesByVille(this.state.VilleNom);
      }, 1);
    }
  }

  getAnnoncesByVille(nom) {
    fetch(`/api/annoncesVille/${nom}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesVille: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="col-md-6 mt-3 mx-auto">
              <Helmet>
                <title>Recherche d'annonces par ville</title>
              </Helmet>
              <h1 className="h3 mb-3 font-weight-normal">
                Recherche par ville
              </h1>
              <div className="form-group">
                <label htmlFor="VilleNom">Ville</label>
                <input
                  type="text"
                  className="form-control"
                  id="VilleNom"
                  name="VilleNom"
                  value={this.state.VilleNom}
                  onChange={this.onChange}
                />
              </div>
              <table align="center">
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Quantité</th>
                    <th>Denrée</th>
                    <th>Magasin</th>
                    <th>Créé le </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.AnnoncesVille.map((annonce) => (
                    <tr key={annonce.AnnonceID}>
                      <td>{annonce.Titre}</td>
                      <td>{annonce.Quantite}</td>
                      <td>{annonce.DenreeNom}</td>
                      <td>{annonce.MagasinNom}</td>
                      <td>{annonce.JourCreation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
