import React, { Component } from "react";

export default class AnnoncesVille extends Component {
  constructor() {
    super();
    this.state = {
      Provinces: [],
      AnnoncesProvince: [],
      ProvinceID: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value !== "") {
      setTimeout(() => {
        this.getAnnoncesByProvince(this.state.ProvinceID);
      }, 1);
    }
  }

  getProvinces() {
    fetch(`/api/provinces`)
      .then((res) => res.json())
      .then((res) => this.setState({ Provinces: res.data }))
      .catch((err) => console.log(err));
  }

  getAnnoncesByProvince(id) {
    fetch(`/api/annoncesProvince/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesProvince: res.data }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getProvinces();
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="col-md-6 mt-3 mx-auto">
              <h1 className="h3 mb-3 font-weight-normal">
                Recherche par province
              </h1>
              <div className="form-group">
                <label htmlFor="ProvinceID">Code postal</label>
                <select
                  className="form-control"
                  name="ProvinceID"
                  id="ProvinceID"
                  value={this.state.ProvinceID}
                  onChange={this.onChange}
                  required
                >
                  <option value="" defaultValue>
                    --Choix de province à effectuer--
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
              <table align="center">
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Quantité</th>
                    <th>Denrée</th>
                    <th>Magasin</th>
                    <th>Créé le </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.AnnoncesProvince.map((annonce) => (
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
          </div>
        </div>
      </div>
    );
  }
}
