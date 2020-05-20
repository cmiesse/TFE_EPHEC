import React, { Component } from "react";
import { Helmet } from "react-helmet";

class Admin extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-2">
          <Helmet>
            <title>Admin</title>
          </Helmet>
        </div>
      </div>
    );
  }
}

export default Admin;
