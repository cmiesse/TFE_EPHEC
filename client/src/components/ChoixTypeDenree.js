import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { getToken } from "../Utils/Common";
import { Helmet } from "react-helmet";
import { userTypes } from "./UserTypesFunctions";
import { userDenrees } from "./UserDenreesFunctions";

class ChoixTypeDenree extends Component {
  constructor() {
    super();
    this.state = {
      UtilisateurID: "",
      Types: [],
      userTypes: [],
      valuesT: [],
      Denrees: [],
      userDenrees: [],
      valuesD: [],
    };
  }

  handleChangeTypes = (e) => {
    let options = e.target.options;
    let selectedOptions = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }

    this.setState({ valuesT: selectedOptions });
  };

  getTypes() {
    fetch(`/api/types`)
      .then((res) => res.json())
      .then((res) => this.setState({ Types: res.data }))
      .catch((error) => {
        console.log(error);
      });
  }
  getUserTypes(user) {
    fetch(`/api/userTypes/${user}`)
      .then((res) => res.json())
      .then((res) => this.setState({ userTypes: res.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  getDenrees() {
    fetch(`/api/denrees`)
      .then((res) => res.json())
      .then((res) => this.setState({ Denrees: res.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  getUserDenrees(user) {
    fetch(`/api/userDenrees/${user}`)
      .then((res) => res.json())
      .then((res) => this.setState({ userDenrees: res.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  handleChangeDenrees = (e) => {
    let options = e.target.options;
    let selectedOptions = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }

    this.setState({ valuesD: selectedOptions });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.valuesT.length !== 0) {
      this.state.valuesT.forEach((value) => {
        const usertype = {
          User: this.state.UtilisateurID,
          Type: value,
        };

        userTypes(usertype)
          .then((res) => {
            console.log("Type ajouté à l'utilisateur");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
    if (this.state.valuesD.length !== 0) {
      this.state.valuesD.forEach((value) => {
        const userdenree = {
          User: this.state.UtilisateurID,
          Denree: value,
        };

        userDenrees(userdenree)
          .then((res) => {
            console.log("Denree ajouté à l'utilisateur");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
    this.props.history.push(`/profile`);
  };

  componentDidMount() {
    const UtilisateurID = jwt_decode(getToken()).UtilisateurID;
    this.setState({
      UtilisateurID: UtilisateurID,
    });
    this.getTypes();
    this.getUserTypes(this.state.UtilisateurID);
    this.getDenrees();
    this.getUserDenrees(this.state.UtilisateurID);
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="mx-auto">
              <Helmet>
                <title>Choix de types et denrées - StockShop</title>
              </Helmet>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <h2>Types</h2>
                  <select
                    className="form-control"
                    multiple={true}
                    value={this.state.valuesT}
                    onChange={this.handleChangeTypes}
                  >
                    {this.state.Types.map((type) => (
                      <option value={type.TypeID} key={type.TypeNom}>
                        {type.TypeNom}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <h2>Denrées</h2>
                  <select
                    className="form-control"
                    multiple={true}
                    value={this.state.valuesD}
                    onChange={this.handleChangeDenrees}
                  >
                    {this.state.Denrees.map((denree) => (
                      <option value={denree.DenreeID} key={denree.DenreeNom}>
                        {denree.DenreeNom}
                      </option>
                    ))}
                  </select>
                </div>
                <br />
                <button
                  className="btn btn-lg btn-primary btn-block"
                  type="submit"
                >
                  Envoyer
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
