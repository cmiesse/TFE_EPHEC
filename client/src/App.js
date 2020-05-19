import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NewAnnonce from "./components/NewAnnonce";
import ChoixTypeDenree from "./components/ChoixTypeDenree";
import AnnonceDetails from "./components/AnnonceDetails";
import AnnoncesCodePostal from "./components/AnnoncesCodePostal";
import AnnoncesVille from "./components/AnnoncesVille";
import AnnoncesProvince from "./components/AnnoncesProvince";
import AnnoncesMagasin from "./components/AnnoncesMagasin";
import Admin from "./components/Admin";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/choicetd" component={ChoixTypeDenree} />
            <Route exact path="/newAnnonce" component={NewAnnonce} />
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
            <Route exact path="/admin" component={Admin} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
