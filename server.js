var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 5000;
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jslmdpmlrdc3419$",
  database: "tfe"
});

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

//Retravailler partie utilisateurs
var Users = require("./routes/Users");
app.use("/users", Users);

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
