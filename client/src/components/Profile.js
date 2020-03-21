import React, { Component } from "react";
import jwt_decode from "jwt-decode";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      Prenom: "",
      Nom: "",
      Email: "",
      Pseudo: "",
      Ville: "",
      JourCreation: "",
      errors: {}
    };
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      Prenom: decoded.Prenom,
      Nom: decoded.Nom,
      Email: decoded.Email,
      Pseudo: decoded.Pseudo,
      Ville: decoded.Ville,
      JourCreation: decoded.JourCreation
    });
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
        </div>
      </div>
    );
  }
}

export default Profile;
