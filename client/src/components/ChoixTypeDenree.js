import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import Select from "react-select";

class ChoixTypeDenree extends Component {
  constructor() {
    super();
    this.state = {
      UtilisateurID: "",
      Pseudo: "",
      Types: [],
      TypesSelect: [],
      Denrees: [],
      DenreesSelect: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getTypes() {
    fetch(`/api/typesSelect`)
      .then((res) => res.json())
      .then((res) => this.setState({ Types: res.data }))
      .catch((err) => console.log(err));
  }

  addTypes() {}

  getDenrees() {
    fetch(`/api/denreesSelect`)
      .then((res) => res.json())
      .then((res) => this.setState({ Denrees: res.data }))
      .catch((err) => console.log(err));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    /*
    const myChoices = {
      MyTypes: this.state.TypesSelect,
      myDenrees: this.state.DenreesSelect,
    };
    */
    this.props.history.push(`/profile`);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      UtilisateurID: decoded.UtilisateurID,
      Pseudo: decoded.Pseudo,
    });
    this.getTypes();
    this.getDenrees();
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="col-md-6 mt-2 mx-auto">
              <form noValidate onSubmit={this.onSubmit}>
                <p>Choisissez vos types et denrées, {this.state.Pseudo}</p>
                <div className="form-group">
                  <label htmlFor="TypesSelect">Types</label>
                  <Select
                    className="mb-3"
                    options={this.state.Types}
                    name="TypeSelect"
                    id="TypesSelect"
                    onChange={this.state.TypesSelect}
                    isMulti
                    placeholder="Choissez les types de denrées qui vous intéressent"
                    noOptionsMessage={() => "Pas d'autres types"}
                  ></Select>
                </div>
                <div className="form-group">
                  <label htmlFor="DenreesSelect">Denrées</label>
                  <Select
                    className="mb-3"
                    options={this.state.Denrees}
                    name="DenreesSelect"
                    id="DenreesSelect"
                    onChange={this.state.DenreesSelect}
                    isMulti
                    placeholder="Choissez les denrées qui vous intéressent"
                    noOptionsMessage={() => "Pas d'autres denrées"}
                  ></Select>
                </div>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Enregistrer vos choix
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChoixTypeDenree;
