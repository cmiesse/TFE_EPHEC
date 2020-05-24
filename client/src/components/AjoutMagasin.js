import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { addMagasin } from "./MagasinFunctions";
import "../App.css";

class AjoutMagasin extends Component {
  constructor() {
    super();
    this.state = {
      MagasinNom: "",
      Adresse: "",
      ProvinceID: "",
      VilleID: "",
      Provinces: [],
      Villes: [],
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

    const magasin = {
      MagasinNom: this.state.MagasinNom,
      Adresse: this.state.Adresse,
      ProvinceID: this.state.ProvinceID,
      VilleID: this.state.VilleID,
    };
    addMagasin(magasin)
      .then((res) => {
        this.props.history.push(`/newAnnonce`);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.setState({
            setError: "Un ou plusieurs champs sont manquants",
          });
        } else this.setState({ setError: "Une erreur s'est produite" });
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
    if (this.state.Adresse.includes("'")) {
      this.setState({ Adresse: this.state.Adresse.replace(/[']/, " ") });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="col-md-6 mt-2 mx-auto">
              <Helmet>
                <title>Ajout de magasin</title>
              </Helmet>
              <form noValidate onSubmit={this.onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Ajout de magasin</h1>
                <div className="form-group">
                  <label htmlFor="MagasinNom">Nom du magasin</label>
                  <input
                    type="text"
                    className="form-control"
                    name="MagasinNom"
                    id="MagasinNom"
                    placeholder="Entrez le nom du magasin"
                    value={this.state.MagasinNom}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Adresse">Adresse</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Adresse"
                    id="Adresse"
                    placeholder="Entrez l'adresse"
                    value={this.state.Adresse}
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
                      Entrez la province du magasin
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
                      Entrez la ville du magasin
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
                  Ajouter
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AjoutMagasin;
