import React, { Component } from "react";
import "../App.css";

class AnnonceDetails extends Component {
  constructor() {
    super();
    this.state = {
      color: "",
      sign: "",
    };
  }
  changeBackgroundColorAndSign = (quantite) => {
    if (quantite === "Vide") {
      this.setState({ color: "red" });
      this.setState({ sign: "X" });
    } else if (quantite === "Peu") {
      this.setState({ color: "orange" });
      this.setState({ sign: "!" });
    } else {
      this.setState({ color: "green" });
      this.setState({ sign: "V" });
    }
  };

  componentDidMount() {
    this.changeBackgroundColorAndSign(this.props.quantite);
  }

  render() {
    return (
      <div className="Annonce" style={{ backgroundColor: this.state.color }}>
        <p className="QuantiteAnnonce">{this.state.sign}</p>
        <b style={{ fontSize: 20 }}>{this.props.denree}</b>
        <p>{this.props.magasin}</p>
        <p>Dernière modification : {this.props.date}</p>
      </div>
    );
  }
}

export default AnnonceDetails;
