import React, { Component } from "react";
import "../App.css";

class AnnonceDetails extends Component {
  constructor() {
    super();
    this.state = {
      color: "",
      sign: "",
      temps: "",
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

  changeTime(heures, minutes) {
    if (heures >= 24) {
      this.setState({ temps: this.props.date });
    } else if (heures === 0 && minutes === 0) {
      this.setState({ temps: "il y a moins d'une minute" });
    } else if (heures !== 0) {
      this.setState({ temps: "il y a " + heures + "h" });
    } else if (heures === 0 && minutes !== 0) {
      this.setState({ temps: "il y a " + minutes + " min" });
    }
  }

  componentDidMount() {
    this.changeBackgroundColorAndSign(this.props.quantite);
    this.changeTime(this.props.heures, this.props.minutes);
  }

  render() {
    return (
      <div className="Annonce" style={{ backgroundColor: this.state.color }}>
        <p className="QuantiteAnnonce">{this.state.sign}</p>
        <b style={{ fontSize: 20 }}>{this.props.denree}</b>
        <p>{this.props.magasin}</p>
        <p>Dernière modification : {this.state.temps}</p>
      </div>
    );
  }
}

export default AnnonceDetails;
