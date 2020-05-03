import React, { Component } from "react";

export default class AnnoncesMagasin extends Component {
  constructor() {
    super();
    this.state = {
      AnnoncesMagasin: [],
      MagasinID: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  getAnnoncesByMagasin(id) {
    fetch(`/api/annoncesMagasin/${id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ AnnoncesMagasin: res.data }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <h1>Recherche par magasin</h1>
          <div className="form-group">
            <label htmlFor="MagasinID">Magasin</label>
            <input
              type="number"
              className="form-control"
              id="MagasinID"
              name="MagasinID"
              value={this.state.MagasinID}
              onChange={this.onChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
