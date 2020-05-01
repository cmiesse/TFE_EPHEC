import React, { Component } from "react";
import "../App.css";

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      Annonces: [],
    };
  }

  getAnnonces() {
    fetch(`/api/annoncesLanding`)
      .then((res) => res.json())
      .then((res) => this.setState({ Annonces: res.data }))
      .catch((err) => console.log(err));
  }
  componentDidMount() {
    this.getAnnonces();
  }
  render() {
    return (
      <div className="container">
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
    );
  }
}

export default Landing;
