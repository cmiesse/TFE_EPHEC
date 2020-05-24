import React, { Component } from "react";
import { Helmet } from "react-helmet";

export default class AnnoncesMagasin extends Component {
  constructor() {
    super();
    this.state = {
      Magasins: [],
      AnnoncesMagasin: [],
      MagasinID: "",
      TypeID: "",
      DenreeID: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value !== "") {
      setTimeout(() => {
        this.getAnnoncesByMagasin(this.state.MagasinID);
      }, 1);
    }
  }

  getMagasins() {
    fetch(`/api/magasins`)
      .then((res) => res.json())
      .then((res) => this.setState({ Magasins: res.data }))
      .catch((err) => console.log(err));
  }

  getAnnoncesByMagasin(id) {
    fetch(`/api/annoncesMagasin/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesMagasin: res.data }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getMagasins();
  }
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="col-md-6 mt-3 mx-auto">
              <Helmet>
                <title>Recherche d'annonces par magasin</title>
              </Helmet>
              <h1 className="h3 mb-3 font-weight-normal">
                Recherche par magasin
              </h1>
              <div className="form-group">
                <label htmlFor="MagasinID">Magasin</label>
                <select
                  className="form-control"
                  name="MagasinID"
                  id="MagasinID"
                  value={this.state.MagasinID}
                  onChange={this.onChange}
                  required
                >
                  <option value="" defaultValue>
                    --Choix de magasin à effectuer--
                  </option>
                  {this.state.Magasins.map((magasin) => (
                    <option key={magasin.MagasinNom} value={magasin.MagasinID}>
                      {magasin.MagasinNom}
                    </option>
                  ))}
                </select>
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
                  {this.state.AnnoncesMagasin.map((annonce) => (
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
