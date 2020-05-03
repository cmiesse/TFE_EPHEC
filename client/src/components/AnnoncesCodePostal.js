import React, { Component } from "react";
import "../App.css";

export default class AnnoncesCodePostal extends Component {
  constructor() {
    super();
    this.state = {
      AnnoncesCodePostal: [],
      CodePostal: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value !== "") {
      setTimeout(() => {
        this.getAnnoncesByCodePostal(this.state.CodePostal);
      }, 1);
    }
  }

  getAnnoncesByCodePostal(id) {
    fetch(`/api/annoncesCodePostal/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesCodePostal: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="col-md-6 mt-3 mx-auto">
              <h1 className="h3 mb-3 font-weight-normal">
                Recherche par code postal
              </h1>
              <div className="form-group">
                <label htmlFor="CodePostal">Code postal</label>
                <input
                  type="number"
                  className="form-control"
                  id="CodePostal"
                  name="CodePostal"
                  value={this.state.CodePostal}
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
                  {this.state.AnnoncesCodePostal.map((annonce) => (
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
