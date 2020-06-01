import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { getToken } from "../Utils/Common";
import { Helmet } from "react-helmet";
import { modifyMdP } from "./UserFunctions";

export default class ModifMdP extends Component {
  constructor() {
    super();
    this.state = {
      UtilisateurID: "",
      MdP: "",
      MdPConf: "",
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
    if (this.state.MdP === this.state.MdPConf) {
      const modifyUser = {
        UtilisateurID: this.state.UtilisateurID,
        MdP: this.state.MdP,
      };

      modifyMdP(modifyUser)
        .then((res) => {
          this.props.history.push(`/profil`);
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.setState({
              setError: "L'utilisateur existe déjà",
            });
          } else
            this.setState({
              setError: "Un ou plusieurs champs sont manquants",
            });
        });
    } else {
      this.setState({ setError: "Les mots de passe sont différents" });
    }
  }

  componentDidMount() {
    const decoded = jwt_decode(getToken());
    this.setState({ UtilisateurID: decoded.UtilisateurID });
  }
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <Helmet>
                <title>Modification mot de passe - StockShop</title>
              </Helmet>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label htmlFor="MdP">Nouveau mot de passe</label>
                  <input
                    type="password"
                    className="form-control"
                    name="MdP"
                    id="MdP"
                    autoComplete="MdP"
                    placeholder="Nouveau mot de passe"
                    value={this.state.MdP}
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="MdPConf">
                    Confirmez votre nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="MdPConf"
                    id="MdPConf"
                    autoComplete="MdPConf"
                    placeholder="Confirmation mot de passe"
                    value={this.state.MdPConf}
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
                  Modifier le mot de passe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
