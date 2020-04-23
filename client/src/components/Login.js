import React, { Component } from "react";
import { login } from "./UserFunctions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      Pseudo: "",
      MotDePasse: "",
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

    const user = {
      Pseudo: this.state.Pseudo,
      MotDePasse: this.state.MotDePasse,
    };

    login(user)
      .then((res) => {
        if (res) {
          this.props.history.push(`/profile`);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          this.setState({
            setError: "L'utilisateur n'existe pas",
          });
        } else
          this.setState({
            setError: "Des données sont manquantes ou incorrects",
          });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">
                Veuillez vous connecter
              </h1>
              <div className="form-group">
                <label htmlFor="Pseudo">Pseudo</label>
                <input
                  type="text"
                  className="form-control"
                  name="Pseudo"
                  id="Pseudo"
                  autoComplete="username"
                  placeholder="Pseudo"
                  value={this.state.Pseudo}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="MotDePasse">Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  name="MotDePasse"
                  id="MotDePasse"
                  autoComplete="current-password"
                  placeholder="Mot de passe"
                  value={this.state.MotDePasse}
                  onChange={this.onChange}
                  required
                />
              </div>
              {this.state.setError && (
                <>
                  <small style={{ color: "red" }}>{this.state.setError}</small>
                  <br />
                </>
              )}
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
