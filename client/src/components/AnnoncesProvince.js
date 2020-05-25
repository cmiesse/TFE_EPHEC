import React, { Component } from "react";
import { getToken } from "../Utils/Common";
import jwt_decode from "jwt-decode";
import { Helmet } from "react-helmet";

export default class AnnoncesProvince extends Component {
  constructor() {
    super();
    this.state = {
      UtilisateurID: "",
      userTypes: [],
      userDenrees: [],
      Provinces: [],
      AnnoncesProvince: [],
      ProvinceID: "",
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

  getProvinces() {
    fetch(`/api/provinces`)
      .then((res) => res.json())
      .then((res) => this.setState({ Provinces: res.data }))
      .catch((err) => console.log(err));
  }

  getAnnoncesByProvince(id) {
    fetch(`/api/annoncesProvince/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesProvince: res.data }))
      .catch((err) => console.log(err));
  }

  getAnnoncesByProvinceAndTypeAndDenree(ProvinceID, TypeID, DenreeID) {
    fetch(
      `/api/annoncesProvince/${ProvinceID}/Type/${TypeID}/Denree/${DenreeID}`
    )
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesProvince: res.data }))
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
            --Choix de type à effectuer--
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
            --Choix de denrée à effectuer--
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
    this.getProvinces();
  }

  componentDidUpdate() {
    if (getToken()) {
      if (
        this.state.ProvinceID !== "" &&
        this.state.TypeID !== "" &&
        this.state.DenreeID !== ""
      ) {
        this.getAnnoncesByProvinceAndTypeAndDenree(
          this.state.ProvinceID,
          this.state.TypeID,
          this.state.DenreeID
        );
      }
    } else {
      if (this.state.ProvinceID !== "") {
        this.getAnnoncesByProvince(this.state.ProvinceID);
      }
    }
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="col-md-6 mt-3 mx-auto">
              <Helmet>
                <title>Recherche d'annonces par province</title>
              </Helmet>
              <h1 className="h3 mb-3 font-weight-normal">
                Recherche par province
              </h1>

              <div className="form-group">
                <label htmlFor="ProvinceID">Province</label>
                <select
                  className="form-control"
                  name="ProvinceID"
                  id="ProvinceID"
                  value={this.state.ProvinceID}
                  onChange={this.onChange}
                  required
                >
                  <option value="" defaultValue>
                    --Choix de province à effectuer--
                  </option>
                  {this.state.Provinces.map((province) => (
                    <option
                      key={province.ProvinceNom}
                      value={province.ProvinceID}
                    >
                      {province.ProvinceNom}
                    </option>
                  ))}
                </select>
              </div>
              {getToken() ? this.renderUserTypes() : ""}
              {getToken() ? this.renderUserDenrees() : ""}
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
                  {this.state.AnnoncesProvince.map((annonce) => (
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
