import React, { Component } from "react";
import "../App.css";
import Red from "./signs/iconeRouge.png";
import Yellow from "./signs/iconeJaune.png";
import Green from "./signs/iconeVert.png";
import Aldi from "./signs/Aldi.png";
import Carrefour from "./signs/Carrefour.png";
import Cora from "./signs/Cora.png";
import Colruyt from "./signs/Colruyt.png";
import Delhaize from "./signs/Delhaize.png";
import Lidl from "./signs/Lidl.png";
import Spar from "./signs/Spar.png";

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

  changeLogoMagasin(magasin) {
    if (magasin.includes("Aldi")) {
      return <img className="LogoMagasin" src={Aldi} alt="" />;
    } else if (magasin.includes("Carrefour")) {
      return <img className="LogoMagasin" src={Carrefour} alt="" />;
    } else if (magasin.includes("Cora")) {
      return <img className="LogoMagasin" src={Cora} alt="" />;
    } else if (magasin.includes("Colruyt")) {
      return <img className="LogoMagasin" src={Colruyt} alt="" />;
    } else if (magasin.includes("Delhaize")) {
      return <img className="LogoMagasin" src={Delhaize} alt="" />;
    } else if (magasin.includes("Lidl")) {
      return <img className="LogoMagasin" src={Lidl} alt="" />;
    } else if (magasin.includes("Spar")) {
      return <img className="LogoMagasin" src={Spar} alt="" />;
    } else {
      return "";
    }
  }

  componentDidMount() {
    this.changeTime(this.props.heures, this.props.minutes);
  }

  render() {
    return (
      <div className="Annonce">
        <b style={{ fontSize: 20 }}>{this.props.denree}</b>
        <p>
          {this.changeLogoMagasin(this.props.magasin)}
          {this.props.magasin}
        </p>
        {this.changeSign(this.props.quantite)}
        <p>Dernière modification : {this.state.temps}</p>
      </div>
    );
  }
}

export default AnnonceDetails;
