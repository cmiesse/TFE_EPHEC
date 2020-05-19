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
  database: "tfe",
});

process.env.SECRET_KEY = "secret";

// Connexion à la DB
connection.connect((err) => {
  if (err) {
    return err;
  }
  console.log("DB : Connecté");
});

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Enregister un utilisateur
app.post("/api/users/register", (req, res) => {
  const userData = {
    Prenom: req.body.Prenom,
    Nom: req.body.Nom,
    Pseudo: req.body.Pseudo,
    MotDePasse: req.body.MotDePasse,
    Email: req.body.Email,
    VilleID: req.body.VilleID,
    ProvinceID: req.body.ProvinceID,
  };
  if (
    !userData.Prenom ||
    !userData.Nom ||
    !userData.Pseudo ||
    !userData.MotDePasse ||
    !userData.Email ||
    !userData.VilleID ||
    !userData.ProvinceID
  ) {
    return res
      .status(400)
      .json({ error: "Un ou plusieurs champs sont manquants" });
  }
  const FIND_USER = `SELECT * FROM utilisateurs WHERE Pseudo ='${userData.Pseudo}'`;
  connection.query(FIND_USER, (err, rows) => {
    if (err) {
      return res.send(err);
    } else if (rows != 0) {
      return res.status(401).json({ error: "L'utilisateur n'existe pas" });
    } else {
      bcrypt.hash(req.body.MotDePasse, 10, (err, hash) => {
        userData.MotDePasse = hash;
        const CREATE_USER = `INSERT INTO utilisateurs(Prenom, Nom, Pseudo, MotDePasse, Email, VilleID, ProvinceID) 
        VALUES('${userData.Prenom}', '${userData.Nom}', '${userData.Pseudo}', '${userData.MotDePasse}', '${userData.Email}', '${userData.VilleID}', '${userData.ProvinceID}')`;
        connection.query(CREATE_USER, (err, results) => {
          if (err) {
            return res.status(400).json({ error: "Autre erreur" });
          } else {
            return res.send("Utilisateur ajouté");
          }
        });
      });
    }
  });
});

// Login
app.post("/api/users/login", (req, res) => {
  const userData = {
    Pseudo: req.body.Pseudo,
    MotDePasse: req.body.MotDePasse,
  };
  const FIND_USER = `SELECT UtilisateurID, Prenom, Nom, Pseudo, MotDePasse, Email, VilleID, ProvinceID, DATE_FORMAT(JourCreation, '%d/%m/%Y') AS JourCreation, Admin FROM utilisateurs WHERE Pseudo ='${userData.Pseudo}'`;
  connection.query(FIND_USER, (err, rows, fields) => {
    if (err) {
      return res.send(err);
    } else if (rows == 0) {
      return res.status(401).json({ error: "L'utilisateur n'existe pas" });
    } else {
      if (bcrypt.compareSync(req.body.MotDePasse, rows[0].MotDePasse)) {
        const utilisateurs = {
          UtilisateurID: rows[0].UtilisateurID,
          Prenom: rows[0].Prenom,
          Nom: rows[0].Nom,
          Pseudo: rows[0].Pseudo,
          MotDePasse: rows[0].MotDePasse,
          Email: rows[0].Email,
          VilleID: rows[0].VilleID,
          ProvinceID: rows[0].ProvinceID,
          JourCreation: rows[0].JourCreation,
          Admin: rows[0].Admin,
        };
        let token = jwt.sign(utilisateurs, process.env.SECRET_KEY, {
          expiresIn: 1440,
        });
        res.send(token);
      } else {
        return res
          .status(400)
          .json({ error: "Le pseudo et/ou le mot de passe sont incorrects." });
      }
    }
  });
});

// profil
/*
app.get("/api/users/profile", (req, res) => {
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
*/

/*******************annonces*********************************/

// Obtenir toutes les annonces
app.get("/api/annonces", (req, res) => {
  const SELECT_ALL_ANNONCES_QUERY = "SELECT * from annonces";
  connection.query(SELECT_ALL_ANNONCES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Obtenir l'annonce avec l'id donné
app.get("/api/annonces/:id", (req, res) => {
  const AnnonceID = req.params.id;
  const SELECT_ANNONCE_BY_ID_QUERY = `SELECT a.Titre, a.Quantite, d.DenreeNom, m.MagasinNom, DATE_FORMAT(a.DATECreation, '%d/%m/%Y') AS JourCreation from annonces a, denrees d, magasins m WHERE a.DenreeID=d.DenreeID AND a.MagasinID=m.MagasinID AND AnnonceID=${AnnonceID}`;
  connection.query(SELECT_ANNONCE_BY_ID_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Obtenir les annonces d'un utilisateur donné
app.get("/api/annoncesUser/:id", (req, res) => {
  const UtilisateurID = req.params.id;
  const SELECT_ANNONCE_BY_ID_QUERY = `SELECT a.AnnonceID, a.Titre, a.Quantite, DATE_FORMAT(a.DATECreation, '%d/%m/%Y') AS JourCreation, d.DenreeNom, m.MagasinNom from annonces a, denrees d, magasins m WHERE a.DenreeID = d.DenreeID AND a.MagasinID=m.MagasinID AND UtilisateurID=${UtilisateurID}`;
  connection.query(SELECT_ANNONCE_BY_ID_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/api/annoncesLanding", (req, res) => {
  const SELECT_ANNONCE_LANDING_QUERY = `SELECT a.AnnonceID, a.Titre, a.Quantite, DATE_FORMAT(a.DATECreation, '%d/%m/%Y') AS JourCreation, d.DenreeNom, m.MagasinNom from annonces a, denrees d, magasins m WHERE a.DenreeID = d.DenreeID AND a.MagasinID=m.MagasinID`;
  connection.query(SELECT_ANNONCE_LANDING_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/api/annoncesProvince/:id", (req, res) => {
  const ProvinceID = req.params.id;
  const SELECT_ANNONCES_BY_PROVINCE_QUERY = `SELECT a.AnnonceID, a.Titre, a.Quantite, DATE_FORMAT(a.DATECreation, '%d/%m/%Y') AS JourCreation, d.DenreeNom, m.MagasinNom from annonces a, denrees d, magasins m WHERE a.DenreeID=d.DenreeID AND a.MagasinID=m.MagasinID AND m.ProvinceID=${ProvinceID}`;
  connection.query(SELECT_ANNONCES_BY_PROVINCE_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/api/annoncesVille/:nom", (req, res) => {
  const VilleNom = req.params.nom;
  const SELECT_ANNONCES_BY_VILLE_QUERY = `SELECT a.AnnonceID, a.Titre, a.Quantite, DATE_FORMAT(a.DATECreation, '%d/%m/%Y') AS JourCreation, d.DenreeNom, m.MagasinNom from annonces a, denrees d, magasins m, villes v WHERE a.DenreeID=d.DenreeID AND a.MagasinID=m.MagasinID AND v.VilleID=m.VilleID AND v.VilleNom='${VilleNom}'`;
  connection.query(SELECT_ANNONCES_BY_VILLE_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/api/annoncesCodePostal/:id", (req, res) => {
  const CodePostal = req.params.id;
  const SELECT_ANNONCES_BY_CODEPOSTAL_QUERY = `SELECT a.AnnonceID, a.Titre, a.Quantite, DATE_FORMAT(a.DATECreation, '%d/%m/%Y') AS JourCreation, d.DenreeNom, m.MagasinNom from annonces a, denrees d, magasins m, villes v WHERE a.DenreeID=d.DenreeID AND a.MagasinID=m.MagasinID AND v.VilleID=m.VilleID AND v.CodePostal=${CodePostal}`;
  connection.query(SELECT_ANNONCES_BY_CODEPOSTAL_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/api/annoncesMagasin/:id", (req, res) => {
  const MagasinID = req.params.id;
  const SELECT_ANNONCES_BY_MAGASIN_QUERY = `SELECT a.AnnonceID, a.Titre, a.Quantite, DATE_FORMAT(a.DATECreation, '%d/%m/%Y') AS JourCreation, d.DenreeNom, m.MagasinNom from annonces a, denrees d, magasins m WHERE a.DenreeID=d.DenreeID AND a.MagasinID=m.MagasinID AND a.MagasinID=${MagasinID}`;
  connection.query(SELECT_ANNONCES_BY_MAGASIN_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
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
    DenreeID: req.body.DenreeID,
  };
  if (
    !AnnonceData.Titre ||
    !AnnonceData.Quantite ||
    !AnnonceData.UtilisateurID ||
    !AnnonceData.MagasinID ||
    !AnnonceData.DenreeID
  ) {
    return res
      .status(400)
      .json({ error: "Un ou plusieurs champs sont manquants" });
  }
  const ADD_ANNONCE_QUERY = `INSERT INTO annonces(Titre, Quantite, UtilisateurID, MagasinID, DenreeID) VALUES('${AnnonceData.Titre}','${AnnonceData.Quantite}','${AnnonceData.UtilisateurID}','${AnnonceData.MagasinID}','${AnnonceData.DenreeID}')`;
  connection.query(ADD_ANNONCE_QUERY, (err, results) => {
    if (err) {
      return res.status(401).json({ error: "Une erreur s'est produite" });
    } else {
      return res.send("Annonce ajouté");
    }
  });
});

/********************denrees********************************/

// Obtenir toutes les denrées
app.get("/api/denrees", (req, res) => {
  const SELECT_ALL_DENREES_QUERY = "SELECT * from denrees";
  connection.query(SELECT_ALL_DENREES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Obtenir toutes les denrées
app.get("/api/denreesSelect", (req, res) => {
  const SELECT_ALL_DENREES_QUERY =
    "SELECT DenreeID AS value, DenreeNom AS label, TypeID from denrees";
  connection.query(SELECT_ALL_DENREES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
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
        data: results,
      });
    }
  });
});

/*************************types********************************************/

// Obtenir tous les types de denrée
app.get("/api/types", (req, res) => {
  const SELECT_ALL_TYPES_QUERY = "SELECT * from types";
  connection.query(SELECT_ALL_TYPES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Obtenir tous les types de denrée
app.get("/api/typesSelect", (req, res) => {
  const SELECT_ALL_TYPES_QUERY =
    "SELECT TypeID AS value, TypeNom AS label from types";
  connection.query(SELECT_ALL_TYPES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
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
        data: results,
      });
    }
  });
});

/*******************magasins*****************************/
// Obtenir tous les magasins
app.get("/api/magasins", (req, res) => {
  const SELECT_ALL_MAGASINS_QUERY = "SELECT * from magasins";
  connection.query(SELECT_ALL_MAGASINS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
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
        data: results,
      });
    }
  });
});

/***********UtilisateursTypes********* */
// Obtenir toutes les liens utilisateur-type
app.get("/api/userTypes", (req, res) => {
  const SELECT_USER_TYPE_QUERY = `SELECT * FROM utilisateurstypes`;
  connection.query(SELECT_USER_TYPE_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Obtenir tous les choix de type d'un utilisateur donné
app.get("/api/userTypes/:id", (req, res) => {
  const UserID = req.params.id;
  const SELECT_USER_TYPE_QUERY = `SELECT ut.TypeID, t.TypeNom FROM utilisateurstypes ut, types t WHERE ut.UtilisateurID=${UserID} AND t.TypeID=ut.TypeID`;
  connection.query(SELECT_USER_TYPE_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Ajouter un choix de type à un utilisateur
app.post("/api/userTypes", (req, res) => {
  const UserTypeData = {
    User: req.body.User,
    Type: req.body.Type,
  };
  const ADD_USER_TYPE_QUERY = `INSERT INTO utilisateurstypes(UtilisateurID, TypeID) VALUES('${UserTypeData.User}','${UserTypeData.Type}')`;
  connection.query(ADD_USER_TYPE_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Type ajouté pour l'utilisateur");
    }
  });
});

/***********UtilisateursDenrees********* */
// Obtenir tous les liens utilisateurs-denrées
app.get("/api/userDenrees", (req, res) => {
  const SELECT_USER_DENREES_QUERY = `SELECT * FROM utilisateursdenrees`;
  connection.query(SELECT_USER_DENREES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Obtenir tous les choix de denrées d'un utilisateur donné
app.get("/api/userDenrees/:id", (req, res) => {
  const UserID = req.params.id;
  const SELECT_USER_DENREES_QUERY = `SELECT ud.DenreeID, d.DenreeNom FROM utilisateursdenrees ud, denrees d WHERE ud.UtilisateurID=${UserID} AND ud.DenreeID=d.DenreeID`;
  connection.query(SELECT_USER_DENREES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

// Ajouter un choix de denrée à un utilisateur
app.post("/api/userDenrees", (req, res) => {
  const UserDenreeData = {
    User: req.body.User,
    Denree: req.body.Denree,
  };
  const ADD_USER_DENREE_QUERY = `INSERT INTO utilisateursdenrees(UtilisateurID, DenreeID) VALUES('${UserDenreeData.User}','${UserDenreeData.Denree}')`;
  connection.query(ADD_USER_DENREE_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send("Denrée ajoutée pour l'utilisateur");
    }
  });
});

/********magasinsdenrees**************/
// Retourner les denrées avec nom d'un magasin donné
app.get("/api/denreesMagasin/:id", (req, res) => {
  const MagasinID = req.params.id;
  const DENREES_MAGASIN_QUERY = `SELECT md.DenreeID, d.DenreeNom FROM magasinsdenrees md, denrees d WHERE md.DenreeID=d.DenreeID AND md.MagasinID=${MagasinID}`;
  connection.query(DENREES_MAGASIN_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

/*****************provinces*******************/
app.get("/api/provinces", (req, res) => {
  const SELECT_PROVINCES_QUERY = `SELECT * FROM provinces`;
  connection.query(SELECT_PROVINCES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/api/provinceNom/:id", (req, res) => {
  const ProvinceID = req.params.id;
  const SELECT_PROVINCE_NOM_QUERY = `SELECT ProvinceNom FROM provinces WHERE ProvinceID=${ProvinceID}`;
  connection.query(SELECT_PROVINCE_NOM_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results[0],
      });
    }
  });
});

/*******************************************************/
app.get("/api/villes", (req, res) => {
  const SELECT_VILLES_QUERY = `SELECT * FROM villes`;
  connection.query(SELECT_VILLES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.get("/api/villeNom/:id", (req, res) => {
  const VilleID = req.params.id;
  const SELECT_VILLE_NOM_QUERY = `SELECT VilleNom FROM villes WHERE VilleID=${VilleID}`;
  connection.query(SELECT_VILLE_NOM_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results[0],
      });
    }
  });
});

app.get("/api/villesProvince/:id", (req, res) => {
  const ProvinceID = req.params.id;
  const SELECT_VILLE_BY_PROVINCE_QUERY = `SELECT VilleID, VilleNom FROM villes WHERE ProvinceID=${ProvinceID}`;
  connection.query(SELECT_VILLE_BY_PROVINCE_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results,
      });
    }
  });
});

app.listen(port, function () {
  console.log("Server is running on port: " + port);
});
