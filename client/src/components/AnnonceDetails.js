import React, { Component } from "react";
import "../App.css";
import Red from "./signs/iconeRouge.png";
import Yellow from "./signs/iconeJaune.png";
import Green from "./signs/iconeVert.png";

class AnnonceDetails extends Component {
  constructor() {
    super();
    this.state = {
      color: "",
      sign: "",
      temps: "",
    };
  }
  changeSign = (quantite) => {
    if (quantite === "Vide") {
      return <img className="QuantiteAnnonce" src={Red} alt="Vide" />;
    } else if (quantite === "Peu") {
      return <img className="QuantiteAnnonce" src={Yellow} alt="Peu" />;
    } else {
      return <img className="QuantiteAnnonce" src={Green} alt="Beaucoup" />;
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
    this.changeTime(this.props.heures, this.props.minutes);
  }

  render() {
    return (
      <div className="Annonce">
        <b style={{ fontSize: 20 }}>{this.props.denree}</b>
        <p>{this.props.magasin}</p>
        {this.changeSign(this.props.quantite)}
        <p>Dernière modification : {this.state.temps}</p>
      </div>
    );
  }
}

export default AnnonceDetails;
