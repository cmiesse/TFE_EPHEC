import React, { Component } from "react";
import { getToken } from "../Utils/Common";
import jwt_decode from "jwt-decode";
import { Helmet } from "react-helmet";

export default class AnnoncesVille extends Component {
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
    if (
      e.target.value !== "" &&
      this.state.TypeID !== "" &&
      this.state.DenreeID !== ""
    ) {
      setTimeout(() => {
        this.getAnnoncesByProvinceAndTypeAndDenree(
          this.state.ProvinceID,
          this.state.TypeID,
          this.state.DenreeID
        );
      }, 1);
    } else if (
      e.target.value !== "" &&
      this.state.TypeID !== "" &&
      this.state.DenreeID === ""
    ) {
      setTimeout(() => {
        this.getAnnoncesByProvinceAndType(
          this.state.ProvinceID,
          this.state.TypeID
        );
      }, 1);
    } else if (
      e.target.value !== "" &&
      this.state.TypeID === "" &&
      this.state.DenreeID !== ""
    ) {
      setTimeout(() => {
        this.getAnnoncesByProvinceAndDenree(
          this.state.ProvinceID,
          this.state.DenreeID
        );
      }, 1);
    } else if (e.target.value !== "") {
      setTimeout(() => {
        this.getAnnoncesByProvince(this.state.ProvinceID);
      }, 1);
    }
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

  getAnnoncesByProvinceAndDenree(ProvinceID, DenreeID) {
    fetch(`/api/annoncesProvince/${ProvinceID}/Denree/${DenreeID}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesProvince: res.data }))
      .catch((err) => console.log(err));
  }

  getAnnoncesByProvinceAndType(ProvinceID, TypeID) {
    fetch(`/api/annoncesProvince/${ProvinceID}/Type/${TypeID}`)
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
  /*
  {getToken() ? this.renderUserTypes() : ""}
  renderUserTypes() {
    return (
      <div className="form-group">
        <label htmlFor="TypeID">Vos types</label>
        <select
          className="form-control"
          name="TypeID"
          id="ID"
          value={this.state.TypeID}
          onChange={(e) => this.setState({ TypeID: e.target.value })}
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
  */

  componentDidMount() {
    if (getToken() !== null) {
      const user = jwt_decode(getToken()).UtilisateurID;
      this.setState({ UtilisateurID: user });
    }
    this.getUserTypes(this.state.UtilisateurID);
    this.getUserDenrees(this.state.UtilisateurID);
    this.getProvinces();
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
