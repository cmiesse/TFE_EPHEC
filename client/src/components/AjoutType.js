import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { addType } from "./TypeFunctions";
import "../App.css";

class AjoutType extends Component {
  constructor() {
    super();
    this.state = {
      TypeNom: "",
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
    const type = {
      TypeNom: this.state.TypeNom,
    };
    addType(type)
      .then((res) => {
        this.props.history.push(`/choixTypesDenrees`);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.setState({
            setError: "Un ou plusieurs champs sont manquants",
          });
        } else this.setState({ setError: "Une erreur s'est produite" });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="col-md-6 mt-2 mx-auto">
              <Helmet>
                <title>Ajout de type - StockShop</title>
              </Helmet>
              <form noValidate onSubmit={this.onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Ajout de type</h1>
                <div className="form-group">
                  <label htmlFor="TypeNom">Nom du type</label>
                  <input
                    type="text"
                    className="form-control"
                    name="TypeNom"
                    id="TypeNom"
                    placeholder="Entrez le nom du type"
                    value={this.state.TypeNom}
                    onChange={this.onChange}
                    required
                  />
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

export default AjoutType;
