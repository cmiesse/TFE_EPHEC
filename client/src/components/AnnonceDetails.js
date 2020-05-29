import React, { Component } from "react";
import "../App.css";

class AnnonceDetails extends Component {
  constructor() {
    super();
    this.state = {
      color: "",
    };
  }
  changeBackgroundColor = (quantite) => {
    if (quantite === "Vide") {
      this.setState({ color: "red" });
    } else if (quantite === "Peu") {
      this.setState({ color: "orange" });
    } else {
      this.setState({ color: "green" });
    }
  };

  componentDidMount() {
    this.changeBackgroundColor(this.props.quantite);
  }

  render() {
    return (
      <div className="Annonce" style={{ backgroundColor: this.state.color }}>
        <b style={{ fontSize: 20 }}>{this.props.denree}</b>
        <p>{this.props.magasin}</p>
        <p>Dernière modification : {this.props.date}</p>
      </div>
    );
  }
}

export default AnnonceDetails;
