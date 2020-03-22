const Sequelize = require("sequelize");
const db = require("../database/db.js");

module.exports = db.sequelize.define(
  "utilisateurs",
  {
    UtilisateurID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Prenom: {
      type: Sequelize.STRING
    },
    Nom: {
      type: Sequelize.STRING
    },
    Pseudo: {
      type: Sequelize.STRING
    },
    MotDePasse: {
      type: Sequelize.STRING
    },
    Email: {
      type: Sequelize.STRING
    },
    Ville: {
      type: Sequelize.STRING
    },
    Admin: {
      type: Sequelize.STRING,
      defaultValue: 0
    },
    JourCreation: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.CURRENT_NOW
    }
  },
  {
    timestamps: false
  }
);
