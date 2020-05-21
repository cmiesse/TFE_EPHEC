import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./Profile.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      UtilisateurID: "",
      Prenom: "",
      Nom: "",
      Email: "",
      Pseudo: "",
      VilleID: "",
      VilleNom: "",
      ProvinceID: "",
      ProvinceNom: "",
      JourCreation: "",
      Annonces: [],
      Types: [],
      Denrees: [],
      errors: {},
    };
  }
  getVilleNom(id) {
    fetch(`/api/villeNom/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ VilleNom: res.data.VilleNom }))
      .catch((error) => {
        console.log(error);
      });
  }

  getProvinceName(id) {
    fetch(`/api/provinceNom/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ ProvinceNom: res.data.ProvinceNom }))
      .catch((error) => {
        console.log(error);
      });
  }

  getAnnoncesUser(user) {
    fetch(`/api/annoncesUser/${user}`)
      .then((res) => res.json())
      .then((res) => this.setState({ Annonces: res.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  getUserTypes(user) {
    fetch(`/api/userTypes/${user}`)
      .then((res) => res.json())
      .then((res) => this.setState({ Types: res.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  deleteUserType(user, type) {
    axios.delete("/api/userTypes", {
      User: user,
      Type: type,
    });
    this.getUserTypes(user);
  }

  getUserDenrees(user) {
    fetch(`/api/userDenrees/${user}`)
      .then((res) => res.json())
      .then((res) => this.setState({ Denrees: res.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  deleteUserDenree(user, denree) {
    axios.delete("/api/userDenrees", {
      User: user,
      Denree: denree,
    });
    this.getUserDenrees(user);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      UtilisateurID: decoded.UtilisateurID,
      Prenom: decoded.Prenom,
      Nom: decoded.Nom,
      Email: decoded.Email,
      Pseudo: decoded.Pseudo,
      VilleID: decoded.VilleID,
      ProvinceID: decoded.ProvinceID,
      JourCreation: decoded.JourCreation,
    });
    setTimeout(() => {
      this.getProvinceName(this.state.ProvinceID);
      this.getVilleNom(this.state.VilleID);
      this.getAnnoncesUser(this.state.UtilisateurID);
      this.getUserTypes(this.state.UtilisateurID);
      this.getUserDenrees(this.state.UtilisateurID);
    }, 1);
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-4">
          <div className="col-sm-8 mx-auto">
            <Helmet>
              <title>Profil</title>
            </Helmet>
            <h1 className="text-center">Profil de {this.state.Pseudo}</h1>
          </div>
          <table className="table col-md-6 mx-auto no-border">
            <tbody>
              <tr className="no-border">
                <td className="no-border">Prénom</td>
                <td className="no-border">{this.state.Prenom}</td>
              </tr>
              <tr className="no-border">
                <td className="no-border">Nom</td>
                <td className="no-border">{this.state.Nom}</td>
              </tr>
              <tr className="no-border">
                <td className="no-border">Email</td>
                <td className="no-border">{this.state.Email}</td>
              </tr>
              <tr className="no-border">
                <td className="no-border">Ville</td>
                <td className="no-border">{this.state.VilleNom}</td>
              </tr>
              <tr className="no-border">
                <td className="no-border">Province</td>
                <td className="no-border">{this.state.ProvinceNom}</td>
              </tr>
              <tr className="no-border">
                <td className="no-border">Compte créé le </td>
                <td className="no-border">{this.state.JourCreation}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="text-center">Mes préférences</h2>
          <Link to="/choicetd">
            <button>Ajouter des préférences</button>
          </Link>
          <br />
          <br />
          <table className="table mx-auto">
            <thead>
              <tr>
                <th>Type</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Types.map((type) => (
                <tr key={type.TypeNom}>
                  <td>{type.TypeNom}</td>
                  <td>X</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="table mx-auto">
            <thead>
              <tr>
                <th>Denrée</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Denrees.map((denree) => (
                <tr key={denree.DenreeNom}>
                  <td>{denree.DenreeNom}</td>
                  <td>X</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="text-center">Mes annonces</h2>
          <table align="center" className="table mx-auto">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Quantité</th>
                <th>Denrée</th>
                <th>Magasin</th>
                <th>Créé le</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Annonces.map((annonce) => (
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
    );
  }
}

export default Profile;
