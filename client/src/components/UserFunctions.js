import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("/api/users/inscription", {
      Prenom: newUser.Prenom,
      Nom: newUser.Nom,
      Pseudo: newUser.Pseudo,
      MotDePasse: newUser.MotDePasse,
      Email: newUser.Email,
      ProvinceID: newUser.ProvinceID,
      VilleID: newUser.VilleID,
    })
    .then((response) => {
      console.log("Enregisté");
    });
};

export const login = (user) => {
  return axios
    .post("/api/users/connexion", {
      Pseudo: user.Pseudo,
      MotDePasse: user.MotDePasse,
    })
    .then((response) => {
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
