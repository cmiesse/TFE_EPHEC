import axios from "axios";

export const annonces = (annonce) => {
  return axios
    .post("api/annonces", {
      Quantite: annonce.Quantite,
      UtilisateurID: annonce.UtilisateurID,
      MagasinID: annonce.MagasinID,
      DenreeID: annonce.DenreeID,
    })
    .then((response) => {
      console.log("Annonce ajoutée");
    });
};
