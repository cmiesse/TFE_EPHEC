import React, { Component } from "react";
import { register } from "./UserFunctions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      Prenom: "",
      Nom: "",
      Pseudo: "",
      Email: "",
      MotDePasse: "",
      Ville: "",
      ProvinceID: "",
      Provinces: [],
      setError: null,
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
      Ville: this.state.Ville,
    };

    register(newUser)
      .then((res) => {
        this.props.history.push(`/profile`);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.setState({
            setError: "L'utilisateur existe déjà",
          });
        } else
          this.setState({ setError: "Un ou plusieurs champs sont manquants" });
      });
  }

  getProvinces() {
    fetch(`/api/provinces`)
      .then((res) => res.json())
      .then((res) => this.setState({ Provinces: res.data }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getProvinces();
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Province">Province</label>
                <select
                  className="form-control"
                  name="ProvinceID"
                  id="ProvinceID"
                  value={this.state.ProvinceID}
                  onChange={this.onChange}
                  required
                >
                  <option value="" defaultValue>
                    Entrez votre province
                  </option>
                  {this.state.Provinces.map((province) => (
                    <option
                      key={province.ProvinceNom}
                      value={province.ProvinceID}
                    >
                      {province.ProvinceNom}
                    </option>
                  ))}
                </select>
              </div>
              {this.state.setError && (
                <>
                  <small style={{ color: "red" }}>{this.state.setError}</small>
                  <br />
                </>
              )}
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
