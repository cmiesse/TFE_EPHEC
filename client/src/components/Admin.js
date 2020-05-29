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
  getAnnonces = (_) => {
    fetch("/api/annonces")
      .then((res) => res.json())
      .then((res) => this.setState({ Annonces: res.data }))
      .catch((err) => console.log(err));
  };

  deleteAnnonce = (AnnonceID) => {
    fetch(`/api/annonces/${AnnonceID.AnnonceID}`, {
      method: "delete",
    })
      .then(this.getAnnonces)
      .catch((err) => console.log(err));
  };

  renderAnnonces = ({
    AnnonceID,
    DenreeNom,
    Quantite,
    MagasinNom,
    Pseudo,
    DateCreation,
  }) => (
    <tr key={AnnonceID}>
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
          X
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
        <div className="jumbotron mt-4">
          <Helmet>
            <title>Admin - StockShop</title>
          </Helmet>
          <div>
            <h1>Administrateur</h1>
            <br />
            <table align="center" className="">
              <thead>
                <tr>
                  <th className="colonne-denree">Denree</th>
                  <th className="colonne-quantite">Quantite</th>
                  <th className="colonne-magasin">Magasin</th>
                  <th className="colonne-user">Utilisateur</th>
                  <th className="colonne-date">Date de création</th>
                  <th className="colonne-delete"></th>
                </tr>
              </thead>
              <tbody>{this.state.Annonces.map(this.renderAnnonces)}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
