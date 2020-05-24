import axios from "axios";

export const addMagasin = (magasin) => {
  return axios
    .post("api/magasins", {
      MagasinNom: magasin.MagasinNom,
      Adresse: magasin.Adresse,
      ProvinceID: magasin.ProvinceID,
      VilleID: magasin.VilleID,
    })
    .then((response) => {
      console.log("Magasin ajoutée");
    });
};
