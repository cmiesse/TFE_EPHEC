import React, { Component } from "react";
import "../App.css";

class AnnonceDetails extends Component {
  constructor() {
    super();
    this.state = { Annonce: [] };
  }
  getAnnonce(annonce) {
    fetch(`/api/annonces/${annonce}`)
      .then((res) => res.json())
      .then((res) => this.setState({ Annonce: res.data }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    const AnnonceID = this.props.match.params.AnnonceID;
    setTimeout(() => {
      this.getAnnonce(AnnonceID);
    }, 1);
  }
  render() {
    return (
      <div className="container">
        {this.state.Annonce.map((annonce) => (
          <div key="Annonce">
            <h1>{annonce.Titre}</h1>
            <h2>
              {annonce.Quantite} de {annonce.DenreeNom} à {annonce.MagasinNom}
            </h2>
            <h3>Annonce créé le : {annonce.JourCreation}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default AnnonceDetails;
