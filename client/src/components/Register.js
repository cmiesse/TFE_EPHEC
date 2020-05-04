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
      VilleID: "",
      Villes: [],
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
      ProvinceID: this.state.ProvinceID,
      VilleID: this.state.VilleID,
    };

    register(newUser)
      .then((res) => {
        this.props.history.push(`/login`);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
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

  getVillesByProvince(id) {
    fetch(`/api/villesProvince/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ Villes: res.data }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getProvinces();
  }

  componentDidUpdate() {
    if (this.state.ProvinceID !== "") {
      this.getVillesByProvince(this.state.ProvinceID);
    }
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <h1 className="h3 mb-3 font-weight-normal">Inscription</h1>
              <form noValidate onSubmit={this.onSubmit}>
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
                  <label htmlFor="ProvinceID">Province</label>
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
                <div className="form-group">
                  <label htmlFor="VilleID">Ville</label>
                  <select
                    className="form-control"
                    name="VilleID"
                    id="VilleID"
                    value={this.state.VilleID}
                    onChange={this.onChange}
                    required
                  >
                    <option value="" defaultValue>
                      Entrez votre ville
                    </option>
                    {this.state.Villes.map((ville) => (
                      <option key={ville.VilleNom} value={ville.VilleID}>
                        {ville.VilleNom}
                      </option>
                    ))}
                  </select>
                </div>
                {this.state.setError && (
                  <>
                    <small style={{ color: "red" }}>
                      {this.state.setError}
                    </small>
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
      </div>
    );
  }
}

export default Register;
