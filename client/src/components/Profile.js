import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import "./Profile.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      UtilisateurID: 11,
      Prenom: "",
      Nom: "",
      Email: "",
      Pseudo: "",
      Ville: "",
      JourCreation: "",
      Annonces: [],
      Types: "vide",
      Denrees: "vide",
      errors: {},
    };
  }

  getAnnoncesUser(user) {
    fetch(`/api/annoncesUser/${user}`)
      .then((res) => res.json())
      .then((res) => this.setState({ Annonces: res.data }))
      .catch((error) => {
        console.log(error);
      });
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
      Ville: decoded.Ville,
      JourCreation: decoded.JourCreation,
    });
    setTimeout(() => {
      this.getAnnoncesUser(this.state.UtilisateurID);
    }, 1);
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-4">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Profil de {this.state.Pseudo}</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Prénom</td>
                <td>{this.state.Prenom}</td>
              </tr>
              <tr>
                <td>Nom</td>
                <td>{this.state.Nom}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.Email}</td>
              </tr>
              <tr>
                <td>Ville</td>
                <td>{this.state.Ville}</td>
              </tr>
              <tr>
                <td>Compte créé le </td>
                <td>{this.state.JourCreation}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="text-center">Mes préférences</h2>
          <Link to="/choicetd">
            <button>Modifier mes préférences</button>
          </Link>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Types</td>
                <td>{this.state.Types}</td>
              </tr>
              <tr>
                <td>Denrées</td>
                <td>{this.state.Denrees}</td>
              </tr>
            </tbody>
          </table>

          <h2 className="text-center">Mes annonces</h2>
          <table align="center">
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
