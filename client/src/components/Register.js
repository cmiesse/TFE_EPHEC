import React, { Component } from "react";
import Select from "react-select";
import { register } from "./UserFunctions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      Prenom: "",
      Nom: "",
      email: "",
      MotDePasse: "",
      Types: [],
      TypesSelect: [],
      Denrees: [],
      DenreesSelect: [],
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({
      multiValue: [...evt.target.selectedOptions].map((o) => o.value),
    });
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
      Ville: this.state.Ville,
    };

    register(newUser).then((res) => {
      this.props.history.push(`/login`);
    });
  }

  getTypes() {
    fetch(`/api/typesSelect`)
      .then((res) => res.json())
      .then((res) => this.setState({ Types: res.data }))
      .catch((err) => console.log(err));
  }

  getDenrees() {
    fetch(`/api/denreesSelect`)
      .then((res) => res.json())
      .then((res) => this.setState({ Denrees: res.data }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getTypes();
    this.getDenrees();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Inscription</h1>
              <div className="form-group">
                <label htmlFor="Prenom">Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  name="Prenom"
                  id="Prenom"
                  autoComplete="Prenom"
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
                  autoComplete="Nom"
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
                  autoComplete="Pseudo"
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
                  autoComplete="MotDePasse"
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
                  autoComplete="Email"
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
                  autoComplete="Ville"
                  placeholder="Entrez votre ville"
                  value={this.state.Ville}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="TypesSelect">Types</label>
                <Select
                  className="mb-3"
                  options={this.state.Types}
                  name="TypeSelect"
                  id="TypesSelect"
                  onChange={this.state.TypesSelect}
                  isMulti
                  placeholder="Choissez les types de denrées qui vous intéressent"
                  noOptionsMessage={() => "Pas d'autres types"}
                ></Select>
              </div>
              <div className="form-group">
                <label htmlFor="DenreesSelect">Denrées</label>
                <Select
                  className="mb-3"
                  options={this.state.Denrees}
                  name="DenreesSelect"
                  id="DenreesSelect"
                  onChange={this.state.DenreesSelect}
                  isMulti
                  placeholder="Choissez les denrées qui vous intéressent"
                  noOptionsMessage={() => "Pas d'autres denrées"}
                ></Select>
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
