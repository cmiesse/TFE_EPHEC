import React, { Component } from "react";
import "./Admin.css";
import { Helmet } from "react-helmet";

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      Annonces: [],
    };
  }
  getAnnonces() {
    fetch(`/api/annonces`)
      .then((res) => res.json())
      .then((res) => this.setState({ Annonces: res.data }))
      .catch((err) => console.log(err));
  }

  deleteAnnonce = (AnnonceID) => {
    fetch(`/api/annonces/${AnnonceID.AnnonceID}`, {
      method: "delete",
    })
      .then(this.getAnnonces)
      .catch((err) => console.log(err));
  };

  renderAnnonces = ({
    AnnonceID,
    Titre,
    DenreeNom,
    Quantite,
    MagasinNom,
    Pseudo,
    DateCreation,
  }) => (
    <tr key={AnnonceID}>
      <td>{AnnonceID}</td>
      <td>{Titre}</td>
      <td>{DenreeNom}</td>
      <td>{Quantite}</td>
      <td>{MagasinNom}</td>
      <td>{Pseudo}</td>
      <td>{DateCreation}</td>

      <td>
        <button
          className="deleteButton"
          onClick={() => this.deleteAnnonce({ AnnonceID })}
        >
          Supprimer annonce
        </button>
      </td>
    </tr>
  );

  componentDidMount() {
    this.getAnnonces();
  }

  render() {
    return (
      <div className="container">
        <Helmet>
          <title>Admin</title>
        </Helmet>
        <div>
          <h1>Administrateur</h1>
          <br />
          <table align="center" className="">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre</th>
                <th>Denree</th>
                <th>Quantite</th>
                <th>Magasin</th>
                <th>Utilisateur</th>
                <th>Date de création</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>{this.state.Annonces.map(this.renderAnnonces)}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Admin;
