import React, { Component } from "react";
import "../App.css";

class AnnonceDetails extends Component {
  constructor() {
    super();
    this.state = { Annonce: [] };
  }
  getAnnonce(annonce) {
    fetch(`/api/annonces/${annonce}`)
      .then((res) => res.json())
      .then((res) => this.setState({ Annonce: res.data }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    const AnnonceID = this.props.match.params.AnnonceID;
    this.getAnnonce(AnnonceID);
  }
  render() {
    return <div className="container"></div>;
  }
}

export default AnnonceDetails;
