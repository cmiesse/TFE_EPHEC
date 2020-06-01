import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ModifMdP from "./components/ModifMdP";
import NewAnnonce from "./components/NewAnnonce";
import ChoixTypeDenree from "./components/ChoixTypeDenree";
import AnnonceDetails from "./components/AnnonceDetails";
import AnnoncesCodePostal from "./components/AnnoncesCodePostal";
import AnnoncesVille from "./components/AnnoncesVille";
import AnnoncesProvince from "./components/AnnoncesProvince";
import AnnoncesMagasin from "./components/AnnoncesMagasin";
import Admin from "./components/Admin";
import AjoutMagasin from "./components/AjoutMagasin";
import AjoutDenree from "./components/AjoutDenree";
import AjoutType from "./components/AjoutType";
import PrivateRoute from "./Utils/PrivateRoute";
import AdminRoute from "./Utils/AdminRoute";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/inscription" component={Register} />
            <Route exact path="/connexion" component={Login} />
            <PrivateRoute exact path="/profil" component={Profile} />
            <PrivateRoute exact path="/modifMotdePasse" component={ModifMdP} />
            <PrivateRoute
              exact
              path="/choixTypesDenrees"
              component={ChoixTypeDenree}
            />
            <PrivateRoute exact path="/ajoutAnnonce" component={NewAnnonce} />
            <PrivateRoute exact path="/ajoutMagasin" component={AjoutMagasin} />
            <PrivateRoute exact path="/ajoutDenree" component={AjoutDenree} />
            <PrivateRoute exact path="/ajoutType" component={AjoutType} />
            <Route
              exact
              path="/annonce/:AnnonceID"
              component={AnnonceDetails}
            />
            <Route
              exact
              path="/annoncesCodePostal"
              component={AnnoncesCodePostal}
            />
            <Route exact path="/annoncesVille" component={AnnoncesVille} />
            <Route
              exact
              path="/annoncesProvince"
              component={AnnoncesProvince}
            />
            <Route exact path="/annoncesMagasin" component={AnnoncesMagasin} />
            <AdminRoute exact path="/admin" component={Admin} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
