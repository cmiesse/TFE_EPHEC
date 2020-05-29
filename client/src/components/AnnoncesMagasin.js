import React, { Component } from "react";
import { getToken } from "../Utils/Common";
import jwt_decode from "jwt-decode";
import AnnonceDetails from "./AnnonceDetails";
import { Helmet } from "react-helmet";

export default class AnnoncesMagasin extends Component {
  constructor() {
    super();
    this.state = {
      UtilisateurID: "",
      userTypes: [],
      userDenrees: [],
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
  getAnnoncesByMagasinAndTypeAndDenree(id, TypeID, DenreeID) {
    fetch(`/api/annoncesMagasin/${id}/${TypeID}/${DenreeID}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesMagasin: res.data }))
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
    this.getMagasins();
  }

  componentDidUpdate() {
    if (getToken()) {
      if (
        this.state.MagasinID !== "" &&
        this.state.TypeID !== "" &&
        this.state.DenreeID !== ""
      ) {
        this.getAnnoncesByMagasinAndTypeAndDenree(
          this.state.MagasinID,
          this.state.TypeID,
          this.state.DenreeID
        );
      }
    } else {
      if (this.state.MagasinID !== "") {
        this.getAnnoncesByMagasin(this.state.MagasinID);
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
                <title>Recherche d'annonces par magasin - StockShop</title>
              </Helmet>
              <h1 className="h3 mb-3 font-weight-normal">
                Recherche par magasin
              </h1>
              {getToken() &&
              this.state.userDenrees.length === 0 &&
              this.state.userTypes.length === 0
                ? messagePersonnalise
                : ""}
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
              {getToken() ? this.renderUserTypes() : ""}
              {getToken() ? this.renderUserDenrees() : ""}
              <div>
                {this.state.AnnoncesMagasin.map((annonce) => (
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
