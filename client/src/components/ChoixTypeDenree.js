import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { getToken } from "../Utils/Common";
import { Helmet } from "react-helmet";

class ChoixTypeDenree extends Component {
  constructor() {
    super();

    this.state = {
      UtilisateurID: "",
      Types: [
        { TypeID: 1, TypeNom: "Hygiène" },
        { TypeID: 2, TypeNom: "Viandes-Poissons-Oeufs" },
        { TypeID: 3, TypeNom: "Fruits & légumes" },
        { TypeID: 4, TypeNom: "Conserves" },
        { TypeID: 5, TypeNom: "Produits surgelés" },
        { TypeID: 6, TypeNom: "Lait" },
        { TypeID: 7, TypeNom: "Pain" },
        { TypeID: 8, TypeNom: "Boissons non alcoolisées" },
        { TypeID: 9, TypeNom: "Alcools" },
      ],
      userTypes: [],
      valuesT: [],
    };
  }

  handleChange1 = (e) => {
    let options = e.target.options;
    let selectedOptions = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }

    this.setState({ valuesT: selectedOptions });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.valuesT);
  };

  getUserTypes(user) {
    fetch(`/api/userTypes/${user}`)
      .then((res) => res.json())
      .then((res) => this.setState({ userTypes: res.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    const UtilisateurID = jwt_decode(getToken()).UtilisateurID;
    this.setState({
      UtilisateurID: UtilisateurID,
    });
    console.log(this.state.UtilisateurID);
    this.getUserTypes(this.state.UtilisateurID);
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="mx-auto">
              <Helmet>
                <title>Choix de types et denrées</title>
              </Helmet>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <h2>Types</h2>
                  <select
                    multiple={true}
                    value={this.state.valuesT}
                    onChange={this.handleChange1}
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
                </div>
                <button type="submit">Envoyer</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChoixTypeDenree;
