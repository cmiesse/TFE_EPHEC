import React, { Component } from "react";

export default class AnnoncesVille extends Component {
  constructor() {
    super();
    this.state = {
      AnnoncesProvince: [],
      ProvinceID: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getAnnoncesByProvince(id) {
    fetch(`/api/annoncesProvinces/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesProvince: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <h1>Recherche par province</h1>
          <div className="form-group">
            <label htmlFor="ProvinceID">Code postal</label>
            <input
              type="number"
              className="form-control"
              id="ProvinceID"
              name="ProvinceID"
              value={this.state.ProvinceID}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
