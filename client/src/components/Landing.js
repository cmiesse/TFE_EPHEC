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
      AnnoncesProvince: [],
      ProvinceID: "",
      AnnoncesVille: [],
      VilleNom: "",
      AnnoncesCodePostal: [],
      CodePostal: "",
      AnnoncesMagasin: [],
      MagasinID: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  getAnnonces() {
    fetch(`/api/annoncesLanding`)
      .then((res) => res.json())
      .then((res) => this.setState({ Annonces: res.data }))
      .catch((err) => console.log(err));
  }
  /*
  getAnnoncesByProvince(id) {
    fetch(`/api/annoncesProvinces/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesProvince: res.data }))
      .catch((err) => console.log(err));
  }
  getAnnoncesByVille(nom) {
    fetch(`/api/annoncesVille/${nom}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesVille: res.data }))
      .catch((err) => console.log(err));
  }

  getAnnoncesByCodePostal(id) {
    fetch(`/api/annoncesCodePostal/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesCodePostal: res.data }))
      .catch((err) => console.log(err));
  }

  getAnnoncesByMagasin(id) {
    fetch(`/api/annoncesMagasin/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesMagasin: res.data }))
      .catch((err) => console.log(err));
  }
*/
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
    this.getAnnonces();
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <h1>Page d'accueil</h1>
          <div className="flexBox">
            <div className="flexItem form-group">
              <label htmlFor="ProvinceID">Province</label>
              <input
                type="number"
                id="ProvinceID"
                name="ProvinceID"
                className="form-control"
                value={this.state.ProvinceID}
                onChange={this.onChange}
              />
              <br />
              <input value="Province" type="button" />
            </div>
            <div className="flexItem form-group">
              <label htmlFor="VilleNom">Ville</label>
              <input
                type="text"
                id="VilleNom"
                name="VilleNom"
                className="form-control"
                value={this.state.VilleNom}
                onChange={this.onChange}
              />
              <br />
              <button>Ville</button>
            </div>
            <div className="flexItem form-group">
              <label htmlFor="CodePostal">Code postal</label>
              <input
                type="number"
                id="CodePostal"
                name="CodePostal"
                min="1000"
                max="9999"
                className="form-control"
                value={this.state.CodePostal}
                onChange={this.onChange}
              />
              <br />
              <button>Code postal</button>
            </div>
            <div className="flexItem form-group">
              <label htmlFor="MagasinID">Magasin</label>
              <input
                type="number"
                id="MagasinID"
                name="MagasinID"
                className="form-control"
                value={this.state.MagasinID}
                onChange={this.onChange}
              />
              <br />
              <button>Magasin</button>
            </div>
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
      </div>
    );
  }
}

export default Landing;
