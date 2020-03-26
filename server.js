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

app.listen(port, function() {
  console.log("Server is running on port: " + port);
});
