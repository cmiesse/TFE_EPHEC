import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getToken, isAdmin } from "../Utils/Common";
import AnnonceDetails from "./AnnonceDetails";
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
  getVilleNom = (id) => {
    fetch(`/api/villeNom/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ VilleNom: res.data.VilleNom }))
      .catch((error) => {
        console.log(error);
      });
  };

  getProvinceName = (id) => {
    fetch(`/api/provinceNom/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ ProvinceNom: res.data.ProvinceNom }))
      .catch((error) => {
        console.log(error);
      });
  };

  getAnnoncesUser = (user) => {
    fetch(`/api/annoncesUser/${user}`)
      .then((res) => res.json())
      .then((res) => this.setState({ Annonces: res.data }))
      .catch((error) => {
        console.log(error);
      });
  };

  getUserTypes = (user) => {
    fetch(`/api/userTypes/${user}`)
      .then((res) => res.json())
      .then((res) => this.setState({ Types: res.data }))
      .catch((error) => {
        console.log(error);
      });
  };

  getUserDenrees = (user) => {
    fetch(`/api/userDenrees/${user}`)
      .then((res) => res.json())
      .then((res) => this.setState({ Denrees: res.data }))
      .catch((error) => {
        console.log(error);
      });
  };

  renderUserDenrees = ({ DenreeNom }) => (
    <tr key={DenreeNom} className="no-border">
      <td className="no-border">{DenreeNom}</td>
    </tr>
  );

  deleteUserTypes = (user) => {
    fetch(`/api/userTypes/${user}`, {
      method: "delete",
    })
      .then(this.getUserTypes(user))
      .catch((err) => console.log(err));
  };

  deleteUserDenrees = (user) => {
    fetch(`/api/userDenrees/${user}`, {
      method: "delete",
    })
      .then(this.getUserDenrees(user))
      .catch((err) => console.log(err));
  };

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
    const pageAdmin = (
      <Link to="/admin">
        <button>Accès page admin</button>
      </Link>
    );
    return (
      <div className="container">
        <div className="jumbotron mt-4">
          <div className="col-sm-8 mx-auto">
            <Helmet>
              <title>Profil - StockShop</title>
            </Helmet>
            <h1 className="text-center">Votre profil</h1>
          </div>
          <table className="table mx-auto no-border">
            <tbody>
              <tr className="no-border">
                <td className="no-border">
                  <b>Pseudo</b>
                </td>
                <td className="no-border">{this.state.Pseudo}</td>
              </tr>
              <tr className="no-border">
                <td className="no-border">
                  <b>Mot de passe</b>
                </td>
                <td className="no-border">
                  <Link to="/modifMotdePasse">
                    <button>Modifier</button>
                  </Link>
                </td>
              </tr>
              <tr className="no-border">
                <td className="no-border">
                  <b>Prénom</b>
                </td>
                <td className="no-border">{this.state.Prenom}</td>
              </tr>
              <tr className="no-border">
                <td className="no-border">
                  <b>Nom</b>
                </td>
                <td className="no-border">{this.state.Nom}</td>
              </tr>
              <tr className="no-border">
                <td className="no-border">
                  <b>Email</b>
                </td>
                <td className="no-border">{this.state.Email}</td>
              </tr>
              <tr className="no-border">
                <td className="no-border">
                  <b>Ville</b>
                </td>
                <td className="no-border">{this.state.VilleNom}</td>
              </tr>
              <tr className="no-border">
                <td className="no-border">
                  <b>Province</b>
                </td>
                <td className="no-border">{this.state.ProvinceNom}</td>
              </tr>
              <tr className="no-border">
                <td className="no-border">
                  <b>Compte créé le</b>
                </td>
                <td className="no-border">{this.state.JourCreation}</td>
              </tr>
              <tr>
                <td className="no-border">
                  <b>Types</b>
                </td>
                <td className="no-border">
                  <ul className="no-list-style">
                    {this.state.Types.map((type) => (
                      <li key={type.TypeNom}>{type.TypeNom}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      this.deleteUserTypes(this.state.UtilisateurID);
                    }}
                  >
                    Supprimer vos types
                  </button>
                </td>
              </tr>
              <tr>
                <td className="no-border">
                  <b>Denrées</b>
                </td>
                <td className="no-border">
                  <ul className="no-list-style">
                    {this.state.Denrees.map((denree) => (
                      <li key={denree.DenreeNom}>{denree.DenreeNom}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      this.deleteUserDenrees(this.state.UtilisateurID);
                    }}
                  >
                    Supprimer vos denrées
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <Link to="/choixTypesDenrees">
            <button className="btn btn-lg btn-primary">
              Ajouter vos choix
            </button>
            <br />
          </Link>

          <br />
          {isAdmin(getToken()) ? pageAdmin : ""}
          <br />
          <hr></hr>
          <h2 className="text-center">Mes annonces</h2>
          <div className="col-sm-8 mx-auto">
            {this.state.Annonces.map((annonce) => (
              <AnnonceDetails
                denree={annonce.DenreeNom}
                quantite={annonce.Quantite}
                magasin={annonce.MagasinNom}
                date={annonce.JourCreation}
                minutes={annonce.nombreMinutes}
                heures={annonce.nombreHeures}
                key={annonce.AnnonceID}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
