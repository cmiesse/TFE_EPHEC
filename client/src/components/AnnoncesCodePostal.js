import React, { Component } from "react";

export default class AnnoncesCodePostal extends Component {
  constructor() {
    super();
    this.state = {
      AnnoncesCodePostal: [],
      CodePostal: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getAnnoncesByCodePostal(id) {
    fetch(`/api/annoncesCodePostal/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesCodePostal: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <h1>Recherche par code postal</h1>
          <div className="form-group">
            <label htmlFor="CodePostal">Code postal</label>
            <input
              type="number"
              className="form-control"
              id="CodePostal"
              name="CodePostal"
              value={this.state.CodePostal}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
