import React, { Component } from "react";
import { register } from "./UserFunctions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      Prenom: "",
      Nom: "",
      email: "",
      MotDePasse: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      Prenom: this.state.Prenom,
      Nom: this.state.Nom,
      Pseudo: this.state.Pseudo,
      MotDePasse: this.state.MotDePasse,
      Email: this.state.Email,
      Ville: this.state.Ville
    };

    register(newUser).then(res => {
      this.props.history.push(`/login`);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="Prenom">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  name="Prenom"
                  id="Prenom"
                  placeholder="Entrez votre prénom"
                  value={this.state.Prenom}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Nom">Nom</label>
                <input
                  type="text"
                  className="form-control"
                  name="Nom"
                  id="Nom"
                  placeholder="Entrez votre nom"
                  value={this.state.Nom}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Pseudo">Pseudo</label>
                <input
                  type="text"
                  className="form-control"
                  name="Pseudo"
                  id="Pseudo"
                  placeholder="Entrez votre pseudo"
                  value={this.state.Pseudo}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="MotDePasse">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  name="MotDePasse"
                  id="MotDePasse"
                  placeholder="Entrez votre mot de passe"
                  value={this.state.MotDePasse}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Email">Adresse email</label>
                <input
                  type="email"
                  className="form-control"
                  name="Email"
                  id="Email"
                  placeholder="Entrez votre email"
                  value={this.state.Email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Ville">Ville</label>
                <input
                  type="text"
                  className="form-control"
                  name="Ville"
                  id="Ville"
                  placeholder="Ville"
                  value={this.state.Ville}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                S'enregistrer!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;