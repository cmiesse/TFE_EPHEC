import React, { Component } from "react";
import { annonces } from "./AnnonceFunctions";
import jwt_decode from "jwt-decode";
import "../App.css";

class NewAnnonce extends Component {
  constructor() {
    super();
    this.state = {
      Titre: "",
      Quantite: "",
      UtilisateurID: "",
      MagasinID: 1,
      DenreeID: 1,
      Magasins: [],
      Denrees: [],
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const annonce = {
      Titre: this.state.Titre,
      Quantite: this.state.Quantite,
      UtilisateurID: this.state.UtilisateurID,
      MagasinID: this.state.MagasinID,
      DenreeID: this.state.DenreeID,
    };

    annonces(annonce).then((res) => {
      this.props.history.push(`/profile`);
    });
  }
  getMagasins() {
    fetch(`/api/magasins`)
      .then((res) => res.json())
      .then((res) => this.setState({ Magasins: res.data }))
      .catch((err) => console.log(err));
  }

  getDenrees() {
    fetch(`/api/denrees`)
      .then((res) => res.json())
      .then((res) => this.setState({ Denrees: res.data }))
      .catch((err) => console.log(err));
  }
  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    setTimeout(() => {
      this.setState({ UtilisateurID: decoded.UtilisateurID });
    }, 1);
    this.getMagasins();
    this.getDenrees();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Ajout d'annonce</h1>
              <div className="form-group">
                <label htmlFor="Titre">Titre</label>
                <input
                  type="text"
                  className="form-control"
                  name="Titre"
                  id="Titre"
                  placeholder="Entrez un titre"
                  value={this.state.Titre}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Quantite">Quantité</label>
                <select
                  className="form-control"
                  name="Quantite"
                  id="Quantite"
                  value={this.state.Quantite}
                  onChange={this.onChange}
                  required
                >
                  <option value="" defaultValue>
                    --Choisissez une option--
                  </option>
                  <option value="Vide">Vide</option>
                  <option value="Peu">Peu</option>
                  <option value="Beaucoup">Beaucoup</option>
                </select>
              </div>
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
                  {this.state.Magasins.map((magasin) => (
                    <option key={magasin.MagasinNom} value={magasin.MagasinID}>
                      {magasin.MagasinNom}
                    </option>
                  ))}
                </select>
              </div>
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
                  {this.state.Denrees.map((denree) => (
                    <option key={denree.DenreeNom} value={denree.DenreeID}>
                      {denree.DenreeNom}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default NewAnnonce;
