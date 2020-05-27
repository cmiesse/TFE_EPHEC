import React, { Component } from "react";
import "../App.css";
import { getToken } from "../Utils/Common";
import jwt_decode from "jwt-decode";
import { Helmet } from "react-helmet";

export default class AnnoncesCodePostal extends Component {
  constructor() {
    super();
    this.state = {
      UtilisateurID: "",
      userTypes: [],
      userDenrees: [],
      AnnoncesCodePostal: [],
      CodePostal: "",
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

  getAnnoncesByCodePostal(id) {
    fetch(`/api/annoncesCodePostal/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesCodePostal: res.data }))
      .catch((err) => console.log(err));
  }

  getAnnoncesByCodePostalAndTypeAndDenree(id, TypeID, DenreeID) {
    fetch(`/api/annoncesCodePostal/${id}/${TypeID}/${DenreeID}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesCodePostal: res.data }))
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
        this.state.CodePostal !== "" &&
        this.state.TypeID !== "" &&
        this.state.DenreeID !== ""
      ) {
        this.getAnnoncesByCodePostalAndTypeAndDenree(
          this.state.CodePostal,
          this.state.TypeID,
          this.state.DenreeID
        );
      }
    } else {
      if (this.state.CodePostal !== "") {
        this.getAnnoncesByCodePostal(this.state.CodePostal);
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
                <title>Recherche d'annonces par code postal - StockShop</title>
              </Helmet>
              <h1 className="h3 mb-3 font-weight-normal">
                Recherche par code postal
              </h1>
              {getToken() &&
              this.state.userDenrees.length === 0 &&
              this.state.userTypes.length === 0
                ? messagePersonnalise
                : ""}
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
              {getToken() ? this.renderUserTypes() : ""}
              {getToken() ? this.renderUserDenrees() : ""}
              <table align="center" className="table mx-auto">
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
