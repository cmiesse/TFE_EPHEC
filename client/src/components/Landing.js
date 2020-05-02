import React, { Component } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "../App.css";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      UtilisateurID: "",
      userLongitude: "",
      userLatitude: "",
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
  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position, options = { enableHighAccuracy: true }) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        console.log(`La précision est de ${position.coords.accuracy} mètres.`);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.setState({ userLatitude: latitude });
        this.setState({ userLongitude: longitude });
      }
    );
  };
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
        <h1>Page d'accueil</h1>
        <div>
          <input
            type="button"
            onClick={this.getUserLocation}
            value={"Ma position"}
            id="positionButton"
          />
        </div>
        <div className="rayon">
          <label className="labelRayon" htmlFor="rayon">
            Choisissez le rayon de recherche :
          </label>
          <select
            id="rayon"
            value={this.state.rayon}
            onChange={(e) =>
              this.setState({
                rayon: e.target.value,
              })
            }
          >
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="20">20 km</option>
          </select>
        </div>

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
    );
  }
}

export default Landing;
