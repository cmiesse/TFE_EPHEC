import React, { Component } from "react";
import { annonces } from "./AnnonceFunctions";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../App.css";

class NewAnnonce extends Component {
  constructor() {
    super();
    this.state = {
      Quantite: "",
      UtilisateurID: "",
      MagasinID: "",
      DenreeID: "",
      Magasins: [],
      Denrees: [],
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

    const annonce = {
      Quantite: this.state.Quantite,
      UtilisateurID: this.state.UtilisateurID,
      MagasinID: this.state.MagasinID,
      DenreeID: this.state.DenreeID,
    };

    annonces(annonce)
      .then((res) => {
        this.props.history.push(`/`);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          this.setState({
            setError: "Un ou plusieurs champs sont manquants",
          });
        } else this.setState({ setError: "Une erreur s'est produite" });
      });
  }
  getMagasins() {
    fetch(`/api/magasins`)
      .then((res) => res.json())
      .then((res) => this.setState({ Magasins: res.data }))
      .catch((err) => console.log(err));
  }

  getDenrees() {
    fetch(`/api/denrees`)
      .then((res) => res.json())
      .then((res) => this.setState({ Denrees: res.data }))
      .catch((err) => console.log(err));
  }
  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    setTimeout(() => {
      this.setState({ UtilisateurID: decoded.UtilisateurID });
    }, 1);
    this.getMagasins();
    this.getDenrees();
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <div className="row">
            <div className="col-md-6 mt-2 mx-auto">
              <Helmet>
                <title>Ajout d'annonce - StockShop</title>
              </Helmet>
              <form noValidate onSubmit={this.onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Ajout d'annonce</h1>
                <div className="form-group">
                  <label htmlFor="DenreeID">Denrée</label>
                  <select
                    className="form-control"
                    name="DenreeID"
                    id="DenreeID"
                    value={this.state.DenreeID}
                    onChange={this.onChange}
                    required
                  >
                    <option value="" defaultValue>
                      --Choix de denrée à effectuer--
                    </option>
                    {this.state.Denrees.map((denree) => (
                      <option key={denree.DenreeNom} value={denree.DenreeID}>
                        {denree.DenreeNom}
                      </option>
                    ))}
                  </select>
                  <Link to={"/ajoutDenree"}>
                    <button type="button">
                      Vous ne trouvez pas une denrée ? Ajoutez la
                    </button>
                  </Link>
                </div>
                <div className="form-group">
                  <label htmlFor="Quantite">Quantité</label>
                  <select
                    className="form-control"
                    name="Quantite"
                    id="Quantite"
                    value={this.state.Quantite}
                    onChange={this.onChange}
                    required
                  >
                    <option value="" defaultValue>
                      --Choisissez une option--
                    </option>
                    <option value="Vide">Vide</option>
                    <option value="Peu">Peu</option>
                    <option value="Beaucoup">Beaucoup</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="MagasinID">Magasin</label>
                  <select
                    className="form-control"
                    name="MagasinID"
                    id="MagasinID"
                    value={this.state.MagasinID}
                    onChange={this.onChange}
                    required
                  >
                    <option value="" defaultValue>
                      --Choix de magasin à effectuer--
                    </option>
                    {this.state.Magasins.map((magasin) => (
                      <option
                        key={magasin.MagasinNom}
                        value={magasin.MagasinID}
                      >
                        {magasin.MagasinNom}
                      </option>
                    ))}
                  </select>
                  <Link to={"/ajoutMagasin"}>
                    <button type="button">
                      Vous ne trouvez pas le magasin ? Ajoutez le
                    </button>
                  </Link>
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
                <br></br>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewAnnonce;
