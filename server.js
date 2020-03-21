const express = require("express");
const mysql = require("mysql");

const app = express();
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Jslmdpmlrdc3419$",
  database: "tfe"
});

connection.connect(err => {
  if (err) {
    return err;
  }
  console.log("connecté");
});

app.get("/api/users", (req, res) => {
  const SELECT_ALL_DENREES_QUERY = "SELECT * FROM utilisateurs";
  connection.query(SELECT_ALL_DENREES_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: results });
    }
  });
});

const port = 5000;
app.listen(port, () =>
  console.log(`Le serveur a commencé sur le port ${port}`)
);
