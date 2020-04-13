import React, { Component } from "react";
import jwt_decode from "jwt-decode";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      UtilisateurID: 1,
      Prenom: "",
      Nom: "",
      Email: "",
      Pseudo: "",
      Ville: "",
      JourCreation: "",
      Annonces: [],
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

  /*<ul>
  {Annonces.map(annonce => (
    <li key={annonce.AnnonceID}>{annonce.Titre}</li>
  ))}
</ul>*/
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
    console.log(this.state.UtilisateurID);
    this.getAnnoncesUser(this.state.UtilisateurID);
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
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
          <h2 className="text-center">Mes annonces</h2>
          {this.state.Annonces.map((annonce) => (
            <li key={annonce.AnnonceID}>{annonce.Titre}</li>
          ))}
        </div>
      </div>
    );
  }
}

export default Profile;
