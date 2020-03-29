var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var app = express();
var port = process.env.PORT || 5000;
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jslmdpmlrdc3419$",
  database: "tfe"
});

process.env.SECRET_KEY = "secret";

// Connexion à la DB
connection.connect(err => {
  if (err) {
    return err;
  }
  console.log("DB : Connecté");
});

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Enregister un utilisateur
app.post("/users/register", (req, res) => {
  const userData = {
    Prenom: req.body.Prenom,
    Nom: req.body.Nom,
    Pseudo: req.body.Pseudo,
    MotDePasse: req.body.MotDePasse,
    Email: req.body.Email,
    Ville: req.body.Ville
  };
  const FIND_USER = `SELECT * FROM utilisateurs WHERE Pseudo ='${userData.Pseudo}'`;
  connection.query(FIND_USER, (err, rows) => {
    if (err) {
      return res.send(err);
    } else if (rows != 0) {
      return res.send("l'utilisateur existe déjà");
    } else {
      bcrypt.hash(req.body.MotDePasse, 10, (err, hash) => {
        userData.MotDePasse = hash;
        const CREATE_USER = `INSERT INTO utilisateurs(Prenom, Nom, Pseudo, MotDePasse, Email, Ville) 
        VALUES('${userData.Prenom}', '${userData.Nom}', '${userData.Pseudo}', '${userData.MotDePasse}', '${userData.Email}', '${userData.Ville}')`;
        connection.query(CREATE_USER, (err, results) => {
          if (err) {
            return res.send(err);
          } else {
            return res.send("Utilisateur ajouté");
          }
        });
      });
    }
  });
});

// Login
app.post("/users/login", (req, res) => {
  const userData = {
    Pseudo: req.body.Pseudo,
    MotDePasse: req.body.MotDePasse
  };
  const FIND_USER = `SELECT UtilisateurID, Prenom, Nom, Pseudo, MotDePasse, Email, Ville,  DATE_FORMAT(JourCreation, '%d/%m/%Y') AS JourCreation FROM utilisateurs WHERE Pseudo ='${userData.Pseudo}'`;
  connection.query(FIND_USER, (err, rows, fields) => {
    if (err) {
      return res.send(err);
    } else if (rows == 0) {
      return res.status(400).json({ error: "L'utilisateur n'existe pas" });
    } else {
      if (bcrypt.compareSync(req.body.MotDePasse, rows[0].MotDePasse)) {
        const utilisateurs = {
          UtilisateurID: rows[0].UtilisateurID,
          Prenom: rows[0].Prenom,
          Nom: rows[0].Nom,
          Pseudo: rows[0].Pseudo,
          MotDePasse: rows[0].MotDePasse,
          Email: rows[0].Email,
          Ville: rows[0].Ville,
          JourCreation: rows[0].JourCreation
        };
        let token = jwt.sign(utilisateurs, process.env.SECRET_KEY, {
          expiresIn: 1440
        });
        res.send(token);
      }
    }
  });
});

// profil
app.get("/users/profile", (req, res) => {
  var decoded = jwt.verify(
    req.headers["authorization"],
    process.env.SECRET_KEY
  );

  const FIND_USER = `SELECT * FROM utilisateurs WHERE Pseudo ='${decoded.Pseudo}'`;
  connection.query(FIND_USER, (err, rows, fields) => {
    if (err) {
      return res.send(err);
    } else if (rows == 0) {
      return res.status(400).json({ error: "L'utilisateur n'existe pas" });
    } else {
      return res.json(rows);
    }
  });
});

// Obtenir toutes les annonces
app.get("/api/annonces", (req, res) => {
  const SELECT_ALL_ANNONCES_QUERY = "SELECT * from annonces";
  connection.query(SELECT_ALL_ANNONCES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

// Obtenir l'annonce avec l'id donné
app.get("/api/annonces/:id", (req, res) => {
  const AnnonceID = req.params.id;
  const SELECT_ANNONCE_BY_ID_QUERY = `SELECT * from annonces WHERE AnnonceID=${AnnonceID}`;
  connection.query(SELECT_ANNONCE_BY_ID_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

// Obtenir l'annonce avec l'id donné
app.get("/api/annonces/user/:id", (req, res) => {
  const UtilisateurID = req.params.id;
  const SELECT_ANNONCE_BY_ID_QUERY = `SELECT * from annonces WHERE UtilisateurID=${UtilisateurID}`;
  connection.query(SELECT_ANNONCE_BY_ID_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

// Ajouter une annonce
app.post("/api/annonces", (req, res) => {
  const AnnonceData = {
    Titre: req.body.Titre,
    Quantite: req.body.Quantite,
    UtilisateurID: req.body.UtilisateurID,
    MagasinID: req.body.MagasinID,
    DenreeID: req.body.DenreeID
  };
  const ADD_ANNONCE_QUERY = `INSERT INTO annonces(Titre, Quantite, UtilisateurID, MagasinID, DenreeID) VALUES('${AnnonceData.Titre}','${AnnonceData.Quantite}','${AnnonceData.UtilisateurID}','${AnnonceData.MagasinID}','${AnnonceData.DenreeID}')`;
  connection.query(ADD_ANNONCE_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Annonce ajouté");
    }
  });
});

// Obtenir toutes les denrées
app.get("/api/denrees", (req, res) => {
  const SELECT_ALL_DENREES_QUERY = "SELECT * from denrees";
  connection.query(SELECT_ALL_DENREES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

// Obtenir la denrée avec l'id donné
app.get("/api/denrees/:id", (req, res) => {
  const DenreeID = req.params.id;
  const SELECT_DENREE_BY_ID_QUERY = `SELECT * from denrees WHERE DenreeID=${DenreeID}`;
  connection.query(SELECT_DENREE_BY_ID_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

// Obtenir tous les types de denrée
app.get("/api/types", (req, res) => {
  const SELECT_ALL_TYPES_QUERY = "SELECT * from types";
  connection.query(SELECT_ALL_TYPES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

// Obtenir le type de denrée avec l'id donné
app.get("/api/types/:id", (req, res) => {
  const TypeID = req.params.id;
  const SELECT_TYPE_BY_ID_QUERY = `SELECT * from types WHERE TypeID=${TypeID}`;
  connection.query(SELECT_TYPE_BY_ID_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

// Obtenir tous les magasins
app.get("/api/magasins", (req, res) => {
  const SELECT_ALL_MAGASINS_QUERY = "SELECT * from magasins";
  connection.query(SELECT_ALL_MAGASINS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

// Obtenir le magasin avec l'id donné
app.get("/api/magasins/:id", (req, res) => {
  const MagasinID = req.params.id;
  const SELECT_MAGASIN_BY_ID_QUERY = `SELECT * from magasins WHERE MagasinID=${MagasinID}`;
  connection.query(SELECT_MAGASIN_BY_ID_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

app.listen(port, function() {
  console.log("Server is running on port: " + port);
});
