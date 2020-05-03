import React, { Component } from "react";

export default class AnnoncesVille extends Component {
  constructor() {
    super();
    this.state = {
      AnnoncesVille: [],
      VilleNom: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getAnnoncesByVille(nom) {
    fetch(`/api/annoncesVille/${nom}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesVille: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <h1>Recherche par ville</h1>
          <div className="form-group">
            <label htmlFor="VilleNom">Ville</label>
            <input
              type="text"
              className="form-control"
              id="VilleNom"
              name="VilleNom"
              value={this.state.VilleNom}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
