import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { addDenree } from "./DenreeFuntions";
import "../App.css";

class AjoutDenree extends Component {
  constructor() {
    super();
    this.state = {
      DenreeNom: "",
      TypeID: "",
      Types: [],
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
    const denree = {
      DenreeNom: this.state.DenreeNom,
      TypeID: this.state.TypeID,
    };
    addDenree(denree)
      .then((res) => {
        this.props.history.push(`/ajoutAnnonce`);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.setState({
            setError: "Un ou plusieurs champs sont manquants",
          });
        } else this.setState({ setError: "Une erreur s'est produite" });
      });
  }

  getTypes() {
    fetch(`/api/types`)
      .then((res) => res.json())
      .then((res) => this.setState({ Types: res.data }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.getTypes();
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="col-md-6 mt-2 mx-auto">
              <Helmet>
                <title>Ajout de denrée - StockShop</title>
              </Helmet>
              <form noValidate onSubmit={this.onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Ajout de denrée</h1>
                <div className="form-group">
                  <label htmlFor="DenreeNom">Nom de la denrée</label>
                  <input
                    type="text"
                    className="form-control"
                    name="DenreeNom"
                    id="DenreeNom"
                    placeholder="Entrez le nom de la denrée"
                    value={this.state.DenreeNom}
                    onChange={this.onChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="TypeID">Type</label>
                  <select
                    className="form-control"
                    name="TypeID"
                    id="TypeID"
                    value={this.state.TypeID}
                    onChange={this.onChange}
                    required
                  >
                    <option value="" defaultValue>
                      Entrez le type de denrée
                    </option>
                    {this.state.Types.map((type) => (
                      <option key={type.TypeNom} value={type.TypeID}>
                        {type.TypeNom}
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

export default AjoutDenree;
