const express = require("express");
const users = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/Utilisateurs");
users.use(cors());

process.env.SECRET_KEY = "secret";

users.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    Prenom: req.body.Prenom,
    Nom: req.body.Nom,
    Pseudo: req.body.Pseudo,
    MotDePasse: req.body.MotDePasse,
    Email: req.body.Email,
    Ville: req.body.Ville,
    JourCreation: today
  };

  User.findOne({
    where: {
      Pseudo: req.body.Pseudo
    }
  })
    //TODO bcrypt
    .then(utilisateurs => {
      if (!utilisateurs) {
        bcrypt.hash(req.body.MotDePasse, 10, (err, hash) => {
          userData.MotDePasse = hash;
          User.create(userData)
            .then(utilisateurs => {
              res.json({ status: utilisateurs.Pseudo + " enregistré!" });
            })
            .catch(err => {
              res.send("error: " + err);
            });
        });
      } else {
        res.json({ error: "L'utilisateur existe déjà" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

users.post("/login", (req, res) => {
  User.findOne({
    where: {
      Pseudo: req.body.Pseudo
    }
  })
    .then(utilisateurs => {
      if (utilisateurs) {
        if (bcrypt.compareSync(req.body.MotDePasse, utilisateurs.MotDePasse)) {
          let token = jwt.sign(
            utilisateurs.dataValues,
            process.env.SECRET_KEY,
            {
              expiresIn: 1440
            }
          );
          res.send(token);
        }
      } else {
        res.status(400).json({ error: "L'utilisateur n'existe pas" });
      }
    })
    .catch(err => {
      res.status(400).json({ error: err });
    });
});

users.get("/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  User.findOne({
    where: {
      UtilisateurID: decoded.UtilisateurID
    }
  })
    .then(utilisateurs => {
      if (utilisateurs) {
        res.json(utilisateurs);
      } else {
        res.send("L'utilisateur n'existe pas");
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

module.exports = users;
