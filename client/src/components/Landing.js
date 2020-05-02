import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../App.css";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      UtilisateurID: "",
      Annonces: [],
      rayon: 20,
    };
  }
  getAnnonces() {
    fetch(`/api/annoncesLanding`)
      .then((res) => res.json())
      .then((res) => this.setState({ Annonces: res.data }))
      .catch((err) => console.log(err));
  }

  getUserTypes(user) {
    fetch(`/api/userTypes/${user}`)
      .then((res) => res.json())
      .then((res) => this.setState({ Types: res.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  getUserDenrees(user) {
    fetch(`/api/userDenrees/${user}`)
      .then((res) => res.json())
      .then((res) => this.setState({ Denrees: res.data }))
      .catch((error) => {
        console.log(error);
      });
  }
  getUser() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      UtilisateurID: decoded.UtilisateurID,
    });
  }

  componentDidMount() {
    /*if (sessionStorage.usertoken !== "") {
      setTimeout(() => {
        this.getUser();
      }, 1);
    }
    */
    this.getAnnonces();
  }
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <h1>Page d'accueil</h1>
          <table align="center">
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
                  <td>
                    <Link to={`/annonce/${annonce.AnnonceID}`}>
                      {annonce.Titre}
                    </Link>
                  </td>
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

export default Landing;
