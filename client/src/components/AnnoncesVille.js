import React, { Component } from "react";
import { getToken } from "../Utils/Common";
import jwt_decode from "jwt-decode";
import AnnonceDetails from "./AnnonceDetails";
import { Helmet } from "react-helmet";

export default class AnnoncesVille extends Component {
  constructor() {
    super();
    this.state = {
      UtilisateurID: "",
      userTypes: [],
      userDenrees: [],
      AnnoncesVille: [],
      VilleNom: "",
      TypeID: "",
      DenreeID: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getUserTypes(user) {
    fetch(`/api/userTypes/${user}`)
      .then((res) => res.json())
      .then((res) => this.setState({ userTypes: res.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  getUserDenrees(user) {
    fetch(`/api/userDenrees/${user}`)
      .then((res) => res.json())
      .then((res) => this.setState({ userDenrees: res.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  getAnnoncesByVille(nom) {
    fetch(`/api/annoncesVille/${nom}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesVille: res.data }))
      .catch((err) => console.log(err));
  }

  getAnnoncesByVilleAndTypeAndDenree(nom, TypeID, DenreeID) {
    fetch(`/api/annoncesVille/${nom}/${TypeID}/${DenreeID}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesVille: res.data }))
      .catch((err) => console.log(err));
  }

  renderUserTypes() {
    return (
      <div className="form-group">
        <label htmlFor="TypeID">Vos types</label>
        <select
          className="form-control"
          name="TypeID"
          id="TypeID"
          value={this.state.TypeID}
          onChange={this.onChange}
          required
        >
          <option value="" defaultValue>
            --Vos types--
          </option>
          {this.state.userTypes.map((type) => (
            <option key={type.TypeNom} value={type.TypeID}>
              {type.TypeNom}
            </option>
          ))}
        </select>
      </div>
    );
  }

  renderUserDenrees() {
    return (
      <div className="form-group">
        <label htmlFor="DenreeID">Vos denrées</label>
        <select
          className="form-control"
          name="DenreeID"
          id="DenreeID"
          value={this.state.DenreeID}
          onChange={this.onChange}
          required
        >
          <option value="" defaultValue>
            --Vos denrées--
          </option>
          {this.state.userDenrees.map((denree) => (
            <option key={denree.DenreeNom} value={denree.DenreeID}>
              {denree.DenreeNom}
            </option>
          ))}
        </select>
      </div>
    );
  }

  componentDidMount() {
    if (getToken() !== null) {
      const user = jwt_decode(getToken()).UtilisateurID;
      this.setState({ UtilisateurID: user });
    }
    setTimeout(() => {
      this.getUserTypes(this.state.UtilisateurID);
      this.getUserDenrees(this.state.UtilisateurID);
    }, 1);
  }

  componentDidUpdate() {
    if (getToken()) {
      if (
        this.state.VilleNom !== "" &&
        this.state.TypeID !== "" &&
        this.state.DenreeID !== ""
      ) {
        this.getAnnoncesByVilleAndTypeAndDenree(
          this.state.VilleNom,
          this.state.TypeID,
          this.state.DenreeID
        );
      }
    } else {
      if (this.state.VilleNom !== "") {
        this.getAnnoncesByVille(this.state.VilleNom);
      }
    }
  }

  render() {
    const messagePersonnalise = (
      <p>
        N'hésitez pas à revenir sur la page après avoir choisi les types et
        denrées qui vous intéressent pour obtenir des recherches personnalisées
      </p>
    );
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="col-md-6 mt-3 mx-auto">
              <Helmet>
                <title>Recherche d'annonces par ville - StockShop</title>
              </Helmet>
              <h1 className="h3 mb-3 font-weight-normal">
                Recherche par ville
              </h1>
              {getToken() &&
              this.state.userDenrees.length === 0 &&
              this.state.userTypes.length === 0
                ? messagePersonnalise
                : ""}
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
              {getToken() ? this.renderUserTypes() : ""}
              {getToken() ? this.renderUserDenrees() : ""}
              <div>
                {this.state.AnnoncesVille.map((annonce) => (
                  <AnnonceDetails
                    denree={annonce.DenreeNom}
                    quantite={annonce.Quantite}
                    magasin={annonce.MagasinNom}
                    date={annonce.JourCreation}
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
